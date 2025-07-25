// 🔷 Interfaz Prototype
interface BurgerPrototype {
  clone(): BurgerPrototype;
}


// 🔷 Concrete class
class BurgerNormal implements BurgerPrototype {
  constructor(
    public pan: string,
    public carne: string,
    public queso: string,
    public salsa: string
  ) {}

  // clone method to create a copy of the burger
  clone(): BurgerNormal {
    return new BurgerNormal(this.pan, this.carne, this.queso, this.salsa);
  }
}