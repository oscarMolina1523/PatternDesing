//this interface defines the methods for the mediator pattern
interface ChatRoomMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
}
