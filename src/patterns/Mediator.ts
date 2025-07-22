//this interface defines the methods for the mediator pattern
interface ChatRoomMediator {
    //this method send message to all users except the sender
    //here the user is the sender of the message
  sendMessage(message: string, user: User): void;

  //add a new user to the chatroom
  addUser(user: User): void;
}


class User {
  constructor(private name: string, private chatRoom: ChatRoomMediator) {}

  send(message: string) {
    console.log(`${this.name} envía: ${message}`);
    this.chatRoom.sendMessage(message, this);
  }

  receive(message: string) {
    console.log(`${this.name} recibe: ${message}`);
  }
}

class ChatRoom implements ChatRoomMediator {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User): void {
    for (let user of this.users) {
      // no le envía el mensaje a sí mismo
      if (user !== sender) {
        user.receive(message);
      }
    }
  }
}

//example to use the ChatRoom and User classes
// const chatRoom = new ChatRoom();

// const user1 = new User("Oscar", chatRoom);
// const user2 = new User("Maria", chatRoom);
// const user3 = new User("Juan", chatRoom);

// chatRoom.addUser(user1);
// chatRoom.addUser(user2);
// chatRoom.addUser(user3);

// user1.send("Hola a todos!");
// user3.send("Hola Oscar!");
