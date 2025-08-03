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


// // repositories/UserRepository.ts
// import { Database } from "../db/Database";

// export class UserRepository {
//   private db = Database.getInstance(); // usamos el Singleton

//   public getUsers() {
//     return this.db.query("SELECT * FROM users");
//   }
// }

// // services/UserService.ts
// import { UserRepository } from "../repositories/UserRepository";

// export class UserService {
//   private repo = new UserRepository();

//   public findAll() {
//     return this.repo.getUsers();
//   }
// }
