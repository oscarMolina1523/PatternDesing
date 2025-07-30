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

class PlayingState implements PlayerState {
  private context: MusicPlayer;

  public setContext(context: MusicPlayer) {
    this.context = context;
  }

  public play() {
    console.log("🔁 Ya está reproduciendo.");
  }

  public pause() {
    console.log("⏸️ Pausando la música...");
    this.context.setState(new PausedState());
  }

  public stop() {
    console.log("⏹️ Deteniendo la música...");
    this.context.setState(new StoppedState());
  }
}

class PausedState implements PlayerState {
  private context: MusicPlayer;

  public setContext(context: MusicPlayer) {
    this.context = context;
  }

  public play() {
    console.log("▶️ Reanudando la música...");
    this.context.setState(new PlayingState());
  }

  public pause() {
    console.log("⏸️ Ya está en pausa.");
  }

  public stop() {
    console.log("⏹️ Deteniendo desde pausa...");
    this.context.setState(new StoppedState());
  }
}

class StoppedState implements PlayerState {
  private context!: MusicPlayer;

  public setContext(context: MusicPlayer) {
    this.context = context;
  }

  public play() {
    console.log("▶️ Empezando a reproducir...");
    this.context.setState(new PlayingState());
  }

  public pause() {
    console.log("⏸️ No puedes pausar si está detenido.");
  }

  public stop() {
    console.log("⏹️ Ya está detenido.");
  }
}

//ejemplo de cliente
const player = new MusicPlayer(new StoppedState());

player.play();   // ▶️ Empezando a reproducir...
player.pause();  // ⏸️ Pausando la música...
player.play();   // ▶️ Reanudando la música...
player.stop();   // ⏹️ Deteniendo la música...
player.pause();  // ⏸️ No puedes pausar si está detenido.
