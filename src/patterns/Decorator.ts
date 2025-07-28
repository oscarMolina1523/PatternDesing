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
