//Explaining the factory pattern, Easy to understand
//The goal is not to depend on a single class but to pass
//it the implementation only and the rest will be done by itself.
// scenery: You want a system that sends notifications. These can be:
// Email
// SMS
// Push notification
// The client doesn't need to worry about what type of notification it is; they'll just call a method to send it.

//define the interface to implement in all notifications
interface Notificacion {
    enviar(mensaje: string): void;
}