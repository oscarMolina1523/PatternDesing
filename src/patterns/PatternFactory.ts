//Explaining the factory pattern, Easy to understand
//The goal is not to depend on a single class but to pass
//it the implementation only and the rest will be done by itself.
// scenery: You want a system that sends notifications. These can be:
// Email
// SMS
// Push notification
// The client doesn't need to worry about what type of notification it is; they'll just call a method to send it.

//define the interface to be implemented in all notifications
interface Notification {
    send(message: string): void;
}

//create the specific products
class NotificacionEmail implements Notification {
    //this method send the message and connect with database
    send(message: string): void {
        console.log(`Enviando EMAIL con message: ${message}`);
    }
}

class NotificacionSMS implements Notification {
    send(message: string): void {
        console.log(`Enviando SMS con message: ${message}`);
    }
}

class NotificacionPush implements Notification {
    send(message: string): void {
        console.log(`Enviando PUSH con message: ${message}`);
    }
}

//create an abstract creator
abstract class notificationcreator {
    //factory method that will be implemented in all subclases
    //return a type of notificationcreator to have
    public abstract createNotification(): Notification;

    //main operation to use in the product
    //obtain the notification selected and send the string to the 
    //method send in the implementation of the notificationcreator selected
    public sendNotification(message: string): void {
        const notification = this.createNotification();
        notification.send(message);
    }
}

//concrete creator for every type of notification
class EmailCreator extends notificationcreator {
    public createNotification(): Notification {
        return new NotificacionEmail();
    }
}

class SMSCreator extends notificationcreator {
    public createNotification(): Notification {
        return new NotificacionSMS();
    }
}

class PushCreator extends notificationcreator {
    public createNotification(): Notification {
        return new NotificacionPush();
    }
}

export {
    notificationcreator,
    EmailCreator,
    SMSCreator,
    PushCreator
};


//client implementation
// function cliente(c: notificationcreator, message: string) {
//     console.log('Cliente: enviando notificación sin saber su clase concreta...');
//     c.sendNotification(message);
// }

// console.log('--- Usando EmailCreator ---');
// cliente(new EmailCreator(), 'Hola por Email');

// console.log('\n--- Usando SMSCreator ---');
// cliente(new SMSCreator(), 'Hola por SMS');

// console.log('\n--- Usando PushCreator ---');
// cliente(new PushCreator(), 'Hola por Push Notification');

