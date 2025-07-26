// Esta interfaz asegura que todos los tipos de notificación tienen el método send
interface Notifier {
  send(message: string): void;
}
