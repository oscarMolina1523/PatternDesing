// La interfaz que implementan los que quieren recibir notificaciones
interface Observer {
  update(news: string): void;
}

// La interfaz del que envía notificaciones
interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}
