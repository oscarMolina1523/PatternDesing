interface PlayerState {
  play(): void;
  pause(): void;
  stop(): void;
}

class MusicPlayer {
  private state!: PlayerState;

  constructor(initialState: PlayerState) {
    this.setState(initialState);
  }

  public setState(state: PlayerState) {
    console.log(`🎵 Estado actual: ${state.constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  public play() {
    this.state.play();
  }

  public pause() {
    this.state.pause();
  }

  public stop() {
    this.state.stop();
  }
}
