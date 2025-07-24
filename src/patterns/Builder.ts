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

// 🍔 Concrete Builder that implements the BurgerBuilder interface
class ConcreteBurgerBuilder implements BurgerBuilder {
    // 🍔 this is the Burger that we are building
  private burger: Burger;

  constructor() {
    // 🍔 Initialize a new Burger instance
    this.reset();
  }

  // 🍔 Reset the builder to start a new Burger
  public reset(): void {
    this.burger = new Burger();
  }

  // 🍔 Methods to add parts to the Burger
  public addPan(): void {
    this.burger.addPart("Pan");
  }

  public addCarne(): void {
    this.burger.addPart("Carne");
  }

  public addQueso(): void {
    this.burger.addPart("Queso");
  }

  public addLechuga(): void {
    this.burger.addPart("Lechuga");
  }

  public addTomate(): void {
    this.burger.addPart("Tomate");
  }

  public addSalsa(salsa: string): void {
    this.burger.addPart(`Salsa ${salsa}`);
  }

  public setTamaño(tamaño: string): void {
    this.burger.addPart(`Tamaño ${tamaño}`);
  }

  // 🍔 Get the constructed Burger and reset the builder for a new one
  public getBurger(): Burger {
    const result = this.burger;
    this.reset(); // reset the builder for a new Burger
    return result;
  }
}

// 👨‍💼 Director: define secuence of construction
class BurgerDirector {
  private builder: BurgerBuilder;

  //receives the builder to use
  public setBuilder(builder: BurgerBuilder): void {
    this.builder = builder;
  }

  // 🍔 Methods to build cheese burger , its a usually combination
  public buildCheeseBurger(): void {
    this.builder.addPan();
    this.builder.addCarne();
    this.builder.addQueso();
    this.builder.addLechuga();
    this.builder.setTamaño("Grande");
    this.builder.addSalsa("BBQ");
  }

  // 🍔 Methods to build veggie burger , its a usually combination
  public buildVeggieBurger(): void {
    this.builder.addPan();
    this.builder.addLechuga();
    this.builder.addTomate();
    this.builder.setTamaño("Mediana");
    this.builder.addSalsa("Mostaza");
  }
}

// 🚀 Client code
function clientCode() {
    //create a director instance
  const director = new BurgerDirector();
  //create a concrete builder instance
  const builder = new ConcreteBurgerBuilder();
  director.setBuilder(builder);

  console.log("🍔 Preparando CheeseBurger:");
  director.buildCheeseBurger();
  const cheeseburger = builder.getBurger();
  cheeseburger.listParts();

  console.log("\n🥗 Preparando VeggieBurger:");
  director.buildVeggieBurger();
  const veggieburger = builder.getBurger();
  veggieburger.listParts();

  console.log("\n🔧 Preparando CustomBurger (cliente elige pasos manualmente):");
  builder.addPan();
  builder.addCarne();
  builder.addTomate();
  builder.setTamaño("Pequeña");
  builder.addSalsa("Ketchup");
  const customBurger = builder.getBurger();
  customBurger.listParts();
}

clientCode();