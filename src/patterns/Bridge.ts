
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  setChannel(channel: number): void;
}
