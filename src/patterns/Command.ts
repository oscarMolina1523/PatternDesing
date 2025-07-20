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
