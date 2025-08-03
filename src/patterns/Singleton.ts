// db/Database.ts
export class Database {
  private static instance: Database;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      console.log("🔌 Creando nueva instancia de conexión a DB...");
    }
    return Database.instance;
  }

  public connect(): void {
    if (!this.isConnected) {
      console.log("✅ Conectado a la base de datos.");
      this.isConnected = true;
    }
  }

  public query(sql: string): any {
    console.log(`📥 Ejecutando query: ${sql}`);
    return { rows: [] };
  }
}
