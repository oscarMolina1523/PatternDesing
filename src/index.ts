import express, { Request, Response } from "express";
import { EmailCreator, SMSCreator, PushCreator, Notificationcreator } from "./patterns/PatternFactory";
import { GUIFactory, MacFactory, WindowsFactory } from "./patterns/AbstractFactory";
import { PaymentGateway, PayPalAdapter, PayPalSDK, StripeAdapter, StripeSDK } from "./patterns/Adapter";
import { SamsungTV, SonyTV, RemoteControl, AdvancedRemoteControl } from "./patterns/Bridge";

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

app.post("/control", (req: Request, res: Response) => {
  const { tv, advanced } = req.body;

  let device;
  let remote;

  // 🔷 1. Elegir la TV
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

  // 🔷 2. Elegir el control
  if (advanced) {
    remote = new AdvancedRemoteControl(device);
  } else {
    remote = new RemoteControl(device);
  }

  // 🔷 3. Usar el control
  remote.togglePower();
  device.setChannel(10);

  // 🔷 4. Si es AdvancedRemoteControl, usar mute
  let muted = false;
  if (advanced) {
    (remote as AdvancedRemoteControl).mute();
    muted = true;
  }

  // 🔷 5. Responder al cliente
  res.json({
    success: true,
    tv,
    control: advanced ? "AdvancedRemoteControl" : "RemoteControl",
    muted
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
