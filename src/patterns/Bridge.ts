// This is the device interface, it defines the methods that any device must implement
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  setChannel(channel: number): void;
}

class SamsungTV implements Device {
  // Propiedad 'enabled' indica si está encendida o apagada
  private enabled = false;
  // Propiedad 'channel' indica el canal actual
  private channel = 1;

  isEnabled() { return this.enabled; }

  enable() { this.enabled = true; console.log("Samsung TV encendida"); }

  disable() { this.enabled = false; console.log("Samsung TV apagada"); }

  setChannel(channel: number) { this.channel = channel; console.log(`Samsung TV canal ${channel}`); }
}
