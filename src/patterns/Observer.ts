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
  // Lista de suscriptores
  private observers: Observer[] = [];
  // Última noticia publicada
  private latestNews: string = '';

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(sub => sub !== observer);
  }

  public notify(): void {
    for (const observer of this.observers) {
      // Llamamos al método update de cada suscriptor con la última noticia
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


const agency = new NewsAgency();

const emailUser = new EmailSubscriber("usuario@email.com");
const smsUser = new SmsSubscriber("+50512345678");

agency.subscribe(emailUser);
agency.subscribe(smsUser);

// Publicamos noticias
agency.publishNews("¡Nuevo presidente electo!");
agency.publishNews("Se avecina una tormenta tropical");

agency.unsubscribe(smsUser); // Ya no le llegan noticias al usuario por SMS

agency.publishNews("Descubren agua en Marte");

// Ejemplo de salida esperada:
// 📰 Agencia: Nueva noticia publicada - "¡Nuevo presidente electo!"
// 📧 Enviando noticia a usuario@email.com: "¡Nuevo presidente electo!"
// 📱 Enviando SMS a +50512345678: "¡Nuevo presidente electo!"

// 📰 Agencia: Nueva noticia publicada - "Se avecina una tormenta tropical"
// 📧 Enviando noticia a usuario@email.com: "Se avecina una tormenta tropical"
// 📱 Enviando SMS a +50512345678: "Se avecina una tormenta tropical"

// 📰 Agencia: Nueva noticia publicada - "Descubren agua en Marte"
// 📧 Enviando noticia a usuario@email.com: "Descubren agua en Marte"

