import express, { Request, Response } from "express";
import { EmailCreator, SMSCreator, PushCreator, Notificationcreator } from "./patterns/PatternFactory";
import { GUIFactory, MacFactory, WindowsFactory } from "./patterns/AbstractFactory";
import { PaymentGateway, PayPalAdapter, PayPalSDK, StripeAdapter, StripeSDK } from "./patterns/Adapter";
import { SamsungTV, SonyTV, RemoteControl, AdvancedRemoteControl } from "./patterns/Bridge";
import {
  BotHandler,
  JuniorAgentHandler,
  SeniorAgentHandler
} from "./patterns/ChainOfResponsability";
import {
  Light,
  LightOnCommand,
  LightOffCommand,
  RemoteControl as LightRemoteControl 
} from "./patterns/Command";


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript and Express!");
});

//this method use the factory pattern
app.post("/notificar", (req: Request, res: Response) => {
  const { tipo, mensaje } = req.body;

  let creator: Notificationcreator;

  switch (tipo) {
    case "email":
      creator = new EmailCreator();
      break;
    case "sms":
      creator = new SMSCreator();
      break;
    case "push":
      creator = new PushCreator();
      break;
    default:
      return res.status(400).json({ error: "Tipo de notificación no soportado" });
  }

  // use factory method to send a notification
  creator.sendNotification(mensaje);

  res.json({ success: true, message: `Notificación enviada por ${tipo}` });
});

// 🚀 Endpoint ot test abstract factory
app.post("/components", (req: Request, res: Response) => {
  const { sistema } = req.body;

  let factory: GUIFactory;

  // 🔷 choose the factory according to the system
  switch (sistema) {
    case "windows":
      factory = new WindowsFactory();
      break;
    case "mac":
      factory = new MacFactory();
      break;
    default:
      return res.status(400).json({ error: "Sistema no soportado (windows/mac)" });
  }

  // 🔷 use the factory to create the product
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  // 🔷 prepair a response to client
  res.json({
    button: button.render(),
    checkbox: checkbox.render(),
    toggleResult: checkbox.toggle(button)
  });
});

//this method use the Adapter pattern
app.post("/pagar", (req: Request, res: Response) => {
  const { proveedor, cantidad } = req.body;

  let pasarela: PaymentGateway;

  switch (proveedor) {
    case "stripe":
      pasarela = new StripeAdapter(new StripeSDK());
      break;
    case "paypal":
      pasarela = new PayPalAdapter(new PayPalSDK());
      break;
    default:
      return res.status(400).json({ error: "Proveedor no soportado (stripe, paypal)" });
  }
  //here you only use the method processPayment
  //and the adapter will take care of the rest
  const resultado = pasarela.processPayment(cantidad);
  res.json({ success: true, resultado });
});

//this method use the Bridge pattern
app.post("/control", (req: Request, res: Response) => {
  //receive data of tv like samsung or sony
  //and if the control is advanced or not (boolean)
  const { tv, advanced } = req.body;

  let device;
  let remote;

  // select the device based on the TV type
  switch (tv) {
    case "samsung":
      device = new SamsungTV();
      break;
    case "sony":
      device = new SonyTV();
      break;
    default:
      return res.status(400).json({ error: "TV no soportada (samsung, sony)" });
  }

  // if advanced is true, use AdvancedRemoteControl, otherwise use RemoteControl
  if (advanced) {
    remote = new AdvancedRemoteControl(device);
  } else {
    remote = new RemoteControl(device);
  }

  // use the remote to control the TV
  remote.togglePower();
  device.setChannel(10);

  // if is AdvancedRemoteControl, mute the TV
  let muted = false;
  if (advanced) {
    (remote as AdvancedRemoteControl).mute();
    muted = true;
  }

  // response for the client
  res.json({
    success: true,
    tv,
    control: advanced ? "AdvancedRemoteControl" : "RemoteControl",
    muted
  });
});

// 🚀 Endpoint to test Chain of Responsibility
app.post("/soporte", (req: Request, res: Response) => {
  const { solicitud } = req.body;

  // crea los handlers
  const bot = new BotHandler();
  const junior = new JuniorAgentHandler();
  const senior = new SeniorAgentHandler();

  // define la cadena: Bot -> Junior -> Senior
  bot.setNext(junior).setNext(senior);

  // usa la cadena para manejar la solicitud
  const resultado = bot.handle(solicitud);

  res.json({
    success: true,
    solicitud,
    resultado
  });
});

// 🚀 Endpoint to test Command pattern
app.post("/luz", (req: Request, res: Response) => {
  const { accion } = req.body;

  const luz = new Light();
  const control = new LightRemoteControl ();

  if (accion === "encender") {
    const encenderCommand = new LightOnCommand(luz);
    control.setCommand(encenderCommand);
  } else if (accion === "apagar") {
    const apagarCommand = new LightOffCommand(luz);
    control.setCommand(apagarCommand);
  } else {
    return res.status(400).json({ error: "Acción no soportada (encender/apagar)" });
  }

  // execute the command
  control.pressButton();

  res.json({
    success: true,
    accion
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
