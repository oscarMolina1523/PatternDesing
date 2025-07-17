import express, { Request, Response } from "express";
import { EmailCreator, SMSCreator, PushCreator, Notificationcreator } from "./patterns/PatternFactory";
import { GUIFactory, MacFactory, WindowsFactory } from "./patterns/AbstractFactory";
import { PaymentGateway, PayPalAdapter, PayPalSDK, StripeAdapter, StripeSDK } from "./patterns/Adapter";

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

  // Usa el factory method para enviar la notificación
  creator.sendNotification(mensaje);

  res.json({ success: true, message: `Notificación enviada por ${tipo}` });
});

// 🚀 Nuevo endpoint para probar Abstract Factory
app.post("/components", (req: Request, res: Response) => {
  const { sistema } = req.body;

  let factory: GUIFactory;

  // 🔷 Elegir la fábrica según el sistema
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

  // 🔷 Usar la fábrica para crear productos
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  // 🔷 Preparar respuesta para el cliente
  res.json({
    button: button.render(),
    checkbox: checkbox.render(),
    toggleResult: checkbox.toggle(button)
  });
});

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

  const resultado = pasarela.processPayment(cantidad);
  res.json({ success: true, resultado });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
