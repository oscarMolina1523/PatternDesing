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

class NotifierDecorator implements Notifier {
  protected wrappee: Notifier;

  constructor(notifier: Notifier) {
    this.wrappee = notifier;
  }

  send(message: string): void {
    this.wrappee.send(message);
  }
}

