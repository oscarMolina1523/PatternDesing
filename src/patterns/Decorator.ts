function sendEmail(to: string, message: string) {
  // Aquí usarías nodemailer, SendGrid, etc.
  console.log(`📧 Email enviado a ${to}: ${message}`);
}

function sendSMS(to: string, message: string) {
  // Aquí usarías Twilio, Vonage, etc.
  console.log(`📲 SMS enviado a ${to}: ${message}`);
}

function sendPush(to: string, message: string) {
  // Firebase, OneSignal, etc.
  console.log(`🔔 Push enviado a ${to}: ${message}`);
}


// Esta interfaz asegura que todos los tipos de notificación tienen el método send
interface Notifier {
  send(message: string): void;
}

//esta clase implementa notifier pero no es un decorador
//es un notificador de email normal
class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`📧 Enviando email: ${message}`);
  }
}

//esta clase implementa notifier pero es un decorador
//es un decorador que agrega funcionalidad al notificador original
class NotifierDecorator implements Notifier {
  protected wrappee: Notifier;

  constructor(notifier: Notifier) {
    this.wrappee = notifier;
  }

  send(message: string): void {
    this.wrappee.send(message);
  }
}

class SMSNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message); // primero ejecuta el anterior
    console.log(`📲 Enviando SMS: ${message}`);
  }
}

class PushNotifier extends NotifierDecorator {
  send(message: string): void {
    super.send(message);
    console.log(`🔔 Enviando notificación Push: ${message}`);
  }
}


// Enviar solo email
const emailOnly = new EmailNotifier();
emailOnly.send("Hola Oscar!");  
// 📧 Enviando email: Hola Oscar!

// Enviar email + SMS
const emailAndSMS = new SMSNotifier(new EmailNotifier());
emailAndSMS.send("Hola Oscar!");
// 📧 Enviando email: Hola Oscar!
// 📲 Enviando SMS: Hola Oscar!

// Enviar email + SMS + Push
const fullNotifier = new PushNotifier(new SMSNotifier(new EmailNotifier()));
fullNotifier.send("Hola Oscar!");
// 📧 Enviando email: Hola Oscar!
// 📲 Enviando SMS: Hola Oscar!
// 🔔 Enviando notificación Push: Hola Oscar!
