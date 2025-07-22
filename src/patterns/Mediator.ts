//this interface defines the methods for the mediator pattern
interface ChatRoomMediator {
    //this method send message to all users except the sender
    //here the user is the sender of the message
  sendMessage(message: string, user: User): void;

  //add a new user to the chatroom
  addUser(user: User): void;
}

//class user represents a user in the chat room
class User {
    //constructor receives a name for the user and a chat room mediator
  //the chat room mediator is used to send messages to other users
  constructor(private name: string, private chatRoom: ChatRoomMediator) {}

  //method to send a message
  send(message: string) {
    console.log(`${this.name} envía: ${message}`);
    //the message is sent to the chat room mediator
    this.chatRoom.sendMessage(message, this);
  }

  //method to receive a message
  receive(message: string) {
    console.log(`${this.name} recibe: ${message}`);
  }
}

//chatroom implements the ChatRoomMediator interface
class ChatRoom implements ChatRoomMediator {
    //an array of users in the chat room
  private users: User[] = [];

  //method to add a user to the chat room
  addUser(user: User): void {
    this.users.push(user);
  }

  //method to send a message to all users except the sender
  sendMessage(message: string, sender: User): void {
    for (let user of this.users) {
      // check if the user is not the sender
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
