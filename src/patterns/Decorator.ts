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
  send(to: string, message: string): void;
}

//esta clase implementa notifier pero no es un decorador
//es un notificador de email normal
class EmailNotifier implements Notifier {
  send(to: string, message: string): void {
    sendEmail(to, message);
  }
}

//esta clase implementa notifier pero es un decorador
//es un decorador que agrega funcionalidad al notificador original
class NotifierDecorator implements Notifier {
  protected wrappee: Notifier;

  constructor(wrappee: Notifier) {
    this.wrappee = wrappee;
  }

  send(to: string, message: string): void {
    this.wrappee.send(to, message);
  }
}

class SMSNotifier extends NotifierDecorator {
  send(to: string, message: string): void {
    super.send(to, message); // delega primero
    sendSMS(to, message);    // luego hace lo suyo
  }
}

class PushNotifier extends NotifierDecorator {
  send(to: string, message: string): void {
    super.send(to, message);
    sendPush(to, message);
  }
}


// Enviar solo email
const emailOnly = new EmailNotifier();
emailOnly.send("oscar@email.com", "Hola Oscar!");

// Enviar email + SMS
const emailSms = new SMSNotifier(new EmailNotifier());
emailSms.send("50512345678", "Tu código es 1234");

// Enviar todo: Email + SMS + Push
const fullNotifier = new PushNotifier(
  new SMSNotifier(
    new EmailNotifier()
  )
);
fullNotifier.send("oscar@email.com", "Bienvenido a EduIncluye 🎓");

