// 🔷 2. Abstract Factory
// ✅ What is it?

// ➡️ It's a pattern for creating families of related products.
// ➡️ It provides an interface for creating multiple related products (family), without specifying their concrete classes.

// ✨ When to use Abstract Factory?
// ✔️ When you need to create multiple products that must always be compatible with each other.
// ✔️ When you want to ensure consistency of styles or variants.

//This is the interface of type button
interface Button {
  render(): string;
}

//This is the interface of type button
interface Checkbox {
  render(): string;
  //this method receives a param of type button, so it can collaborate with it
  //example: Imagine that:
  // ✅ The checkbox wants to "collaborate" by changing its state depending on whether the button is active or not.
  // So:
  // toggle(button: Button): string;
  // ➡️ It means: "Give me product button, and I'll do something with it."
  //If you don't need to collaborate with button interface you can skip this method, comment it.
    toggle(button: Button): string;
}

//This interface defines what methods you need implement in the windows factories
//and mac factories to create the products
export interface GUIFactory {
  createButton(): Button; //return a type of Button
  createCheckbox(): Checkbox;//return a type of Checkbox
}


//this is the windows factory 
export class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}


//this is the mac factory
export class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}


//button for only windows
class WindowsButton implements Button {
  render(): string {
    return "Renderizando Botón Windows";
  }
}

//button for only mac
class MacButton implements Button {
  render(): string {
    return "Renderizando Botón Mac";
  }
}

//checkbox for only windows
class WindowsCheckbox implements Checkbox {
  render(): string {
    return "Renderizando Checkbox Windows";
  }

  toggle(button: Button): string {
    const btnRender = button.render();
    return `Checkbox Windows interactúa con (${btnRender})`;
  }
}

//checkbox for only mac
class MacCheckbox implements Checkbox {
  render(): string {
    return "Renderizando Checkbox Mac";
  }

  toggle(button: Button): string {
    const btnRender = button.render();
    return `Checkbox Mac interactúa con (${btnRender})`;
  }
}


// function app(factory: GUIFactory) {
//   const button = factory.createButton();
//   const checkbox = factory.createCheckbox();

//   console.log(button.render());
//   console.log(checkbox.render());
//   console.log(checkbox.toggle(button));
// }
