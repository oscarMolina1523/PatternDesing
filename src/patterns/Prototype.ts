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

// 🔷 Client

// Create a base burger
const burgerBase = new BurgerNormal("Clásico", "Res", "Cheddar", "BBQ");

// Clone the base burger for different orders
const pedido1 = burgerBase.clone();
pedido1.salsa = "Mostaza"; // client changes sauce

const pedido2 = burgerBase.clone();
pedido2.queso = "Mozzarella"; // clien changes cheese

console.log("Pedido 1:", pedido1);
console.log("Pedido 2:", pedido2);