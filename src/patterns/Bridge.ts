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

//this remote control receives a device and 
//you can inherit all the methods of the device
//and use them without problems
class RemoteControl {

  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  //to control if is on or off
  //this method is for all the devices
  //no problem if is a Samsung or Sony
  //as long as it is of type device
  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }
}
