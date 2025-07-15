//Explaining the factory pattern, Easy to understand
//The goal is not to depend on a single class but to pass
//it the implementation only and the rest will be done by itself.
// scenery: You want a system that sends notifications. These can be:
// Email
// SMS
// Push notification
// The client doesn't need to worry about what type of notification it is; they'll just call a method to send it.

//define the interface to be implemented in all notifications
interface Notificacion {
    enviar(mensaje: string): void;
}

//create the specific products
class NotificacionEmail implements Notificacion {
    enviar(mensaje: string): void {
        console.log(`Enviando EMAIL con mensaje: ${mensaje}`);
    }
}

class NotificacionSMS implements Notificacion {
    enviar(mensaje: string): void {
        console.log(`Enviando SMS con mensaje: ${mensaje}`);
    }
}

class NotificacionPush implements Notificacion {
    enviar(mensaje: string): void {
        console.log(`Enviando PUSH con mensaje: ${mensaje}`);
    }
}

//create an abstract creator
abstract class NotificacionCreator {
    //factory method that will be implemented in all subclases
    public abstract crearNotificacion(): Notificacion;

    //main operation to use in the product
    public enviarNotificacion(mensaje: string): void {
        const notificacion = this.crearNotificacion();
        notificacion.enviar(mensaje);
    }
}

//concrete creator for every type of notification
class EmailCreator extends NotificacionCreator {
    public crearNotificacion(): Notificacion {
        return new NotificacionEmail();
    }
}

class SMSCreator extends NotificacionCreator {
    public crearNotificacion(): Notificacion {
        return new NotificacionSMS();
    }
}

class PushCreator extends NotificacionCreator {
    public crearNotificacion(): Notificacion {
        return new NotificacionPush();
    }
}

export {
    NotificacionCreator,
    EmailCreator,
    SMSCreator,
    PushCreator
};


//client implementation
// function cliente(c: NotificacionCreator, mensaje: string) {
//     console.log('Cliente: enviando notificación sin saber su clase concreta...');
//     c.enviarNotificacion(mensaje);
// }

// console.log('--- Usando EmailCreator ---');
// cliente(new EmailCreator(), 'Hola por Email');

// console.log('\n--- Usando SMSCreator ---');
// cliente(new SMSCreator(), 'Hola por SMS');

// console.log('\n--- Usando PushCreator ---');
// cliente(new PushCreator(), 'Hola por Push Notification');

