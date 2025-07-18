// This is the device interface, it defines the methods that any device must implement
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  setChannel(channel: number): void;
}

//this class implements the Device interface for a Samsung basic TV
class SamsungTV implements Device {
  // property to know if is on or off
  private enabled = false;
  // property to know the current channel
  private channel = 1;

  isEnabled() { return this.enabled; }

  enable() { this.enabled = true; console.log("Samsung TV encendida"); }

  disable() { this.enabled = false; console.log("Samsung TV apagada"); }

  setChannel(channel: number) { this.channel = channel; console.log(`Samsung TV canal ${channel}`); }
}

//this class implements the Device interface for a Sony basic TV
class SonyTV implements Device {
  private enabled = false;
  private channel = 1;

  isEnabled() { return this.enabled; }

  enable() { this.enabled = true; console.log("Sony TV encendida"); }

  disable() { this.enabled = false; console.log("Sony TV apagada"); }

  setChannel(channel: number) { this.channel = channel; console.log(`Sony TV canal ${channel}`); }
}
