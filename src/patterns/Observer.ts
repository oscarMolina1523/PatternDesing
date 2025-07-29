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

class NewsAgency implements Subject {
  private observers: Observer[] = [];
  private latestNews: string = '';

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(sub => sub !== observer);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this.latestNews);
    }
  }

  // Simula una nueva noticia
  public publishNews(news: string): void {
    console.log(`📰 Agencia: Nueva noticia publicada - "${news}"`);
    this.latestNews = news;
    this.notify(); // Avisamos a todos los subscriptores
  }
}

class EmailSubscriber implements Observer {
  constructor(private email: string) {}

  update(news: string): void {
    console.log(`📧 Enviando noticia a ${this.email}: "${news}"`);
  }
}

class SmsSubscriber implements Observer {
  constructor(private phoneNumber: string) {}

  update(news: string): void {
    console.log(`📱 Enviando SMS a ${this.phoneNumber}: "${news}"`);
  }
}


