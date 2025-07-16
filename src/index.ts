import express, { Request, Response } from "express";
import { EmailCreator, SMSCreator, PushCreator, NotificacionCreator } from "./patterns/PatternFactory";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript and Express!");
});

//this method use the factory pattern
app.post("/notificar", (req: Request, res: Response) => {
  const { tipo, mensaje } = req.body;

  let creator: NotificacionCreator;

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
  creator.enviarNotificacion(mensaje);

  res.json({ success: true, message: `Notificación enviada por ${tipo}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
