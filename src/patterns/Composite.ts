// 🔷 Componente base: declara métodos comunes para items y combos
abstract class MenuComponent {
    //this symbol "!" means that this property will be initialized later
    //if is a combo the parent will be the combo that contains it, if is an item the parent will be null
  protected parent!: MenuComponent | null;

  //this method allows to set the parent of the component
  setParent(parent: MenuComponent | null) {
    this.parent = parent;
  }

  //this method allows to get the parent of the component
  getParent(): MenuComponent | null {
    return this.parent;
  }

  // Por defecto no hacen nada (solo los combos agregan o eliminan hijos)
  add(component: MenuComponent): void {}
  remove(component: MenuComponent): void {}

  // Saber si es combo o item
  isComposite(): boolean {
    return false;
  }

  // 🔷 Método abstracto que implementarán Item y Combo
  abstract getPrice(): number;
  abstract getDescription(): string;
}

// 🔷 Clase hoja: un item simple (no tiene hijos)
class MenuItem extends MenuComponent {
  constructor(private name: string, private price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.name;
  }
}

// 🔷 Clase composite: un combo que puede contener items o combos
class Combo extends MenuComponent {
  private children: MenuComponent[] = [];

  add(component: MenuComponent): void {
    this.children.push(component);
    component.setParent(this);
  }

  remove(component: MenuComponent): void {
    const index = this.children.indexOf(component);
    this.children.splice(index, 1);
    component.setParent(null);
  }

  isComposite(): boolean {
    return true;
  }

  getPrice(): number {
    // suma el precio de todos los hijos
    return this.children.reduce((total, child) => total + child.getPrice(), 0);
  }

  getDescription(): string {
    const descs = this.children.map(child => child.getDescription());
    return `Combo [${descs.join(', ')}]`;
  }
}

// 🔷 Código cliente
const burger = new MenuItem("🍔 Burger", 5);
const fries = new MenuItem("🍟 Fries", 2);
const soda = new MenuItem("🥤 Soda", 1.5);

//create the first combo with burger and fries
const combo1 = new Combo();
combo1.add(burger);
combo1.add(fries);

const combo2 = new Combo();
combo2.add(combo1);
combo2.add(soda);

console.log(combo1.getDescription()); // Combo [🍔 Burger, 🍟 Fries]
console.log("Precio combo1:", combo1.getPrice()); // 7

console.log(combo2.getDescription()); // Combo [Combo [🍔 Burger, 🍟 Fries], 🥤 Soda]
console.log("Precio combo2:", combo2.getPrice()); // 8.5
