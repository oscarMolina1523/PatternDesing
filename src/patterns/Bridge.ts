// This is the device interface, it defines the methods that any device must implement
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  setChannel(channel: number): void;
}
