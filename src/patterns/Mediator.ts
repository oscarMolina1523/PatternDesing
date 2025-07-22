//this interface defines the methods for the mediator pattern
interface ChatRoomMediator {
  sendMessage(message: string, user: User): void;
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
