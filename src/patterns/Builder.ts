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