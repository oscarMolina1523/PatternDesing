//real light , it tuns on and off
class Light {
  turnOn() {
    console.log("💡 La luz se encendió.");
  }
  turnOff() {
    console.log("💡 La luz se apagó.");
  }
}

// Command interface
interface Command {
  execute(): void;
}

//concrete command, this turn on the light
class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
}

//concrete command, this turn off the light
class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
}

//remote control to execute commands of the light

class RemoteControl {
  private command?: Command;

  setCommand(command: Command) {
    this.command = command;
  }

  pressButton() {
    if (this.command) {
      this.command.execute();
    } else {
      console.log("No hay comando asignado.");
    }
  }
}
