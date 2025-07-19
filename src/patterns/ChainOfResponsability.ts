//this interface defines the structure for a handler in the Chain of Responsibility pattern
interface Handler {
    //this method sets the next handler in the chain
  setNext(handler: Handler): Handler;
  //this method processes the request and returns a response or null if it can't handle it
  handle(request: string): string | null;
}

abstract class SupportHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler; //return the next handler for chaining
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null; //if no handler can process the request, return null
  }
}

class BotHandler extends SupportHandler {
  handle(request: string): string | null {
    if (request === "FAQ") {
      return "Bot: Aquí está la respuesta automática.";
    }
    return super.handle(request); // pass to the next handler
  }
}

class JuniorAgentHandler extends SupportHandler {
  handle(request: string): string | null {
    if (request === "Password Reset") {
      return "Agente Junior: Te ayudé a resetear tu contraseña.";
    }
    return super.handle(request);
  }
}

class SeniorAgentHandler extends SupportHandler {
  handle(request: string): string | null {
    return "Agente Senior: Revisé tu caso complejo y te ayudé.";
  }
}

