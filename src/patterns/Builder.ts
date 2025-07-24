// 🍔 Final Product: Burger
class Burger {
    // 🍔 this contain all the Parts of the burger
  private parts: string[] = [];

  //this method allows to add parts to the burger
  public addPart(part: string): void {
    this.parts.push(part);
  }

  // 🍔 this method allows to list all the parts of the burger
  public listParts(): void {
    console.log(`🍔 Tu hamburguesa tiene: ${this.parts.join(", ")}`);
  }
}

// 🍔 Builder Interface for creating a Burger
interface BurgerBuilder {
  addPan(): void;
  addCarne(): void;
  addQueso(): void;
  addLechuga(): void;
  addTomate(): void;
  addSalsa(salsa: string): void;
  setTamaño(tamaño: string): void;
  getBurger(): Burger;
}