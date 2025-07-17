//This is the interface of all A products and what they can do
interface AbstractProductA {
  usefulFunctionA(): string;
}
//This is the interface of all B products and what they can do
interface AbstractProductB {
  usefulFunctionB(): string;
  //this method receives a param of type A, so it can collaborate with it
  //example: Imagine that:
  // ProductA is a Button
  // ProductB is a Checkbox
  // ✅ The checkbox wants to "collaborate" by changing its state depending on whether the button is active or not.
  // So:
  // anotherUsefulFunctionB(collaborator: AbstractProductA)
  // ➡️ It means: "Give me product A, and I'll do something with it."
  //If you don't need to collaborate with another interface you can skip this method, comment it.
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

//This method defines what type of products can be created with each method
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

//this is the concrete factory of a particular product A1, B1
class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

//this is the concrete factory of a particular product A2, B2
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return "Result A1";
  }
}
class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return "Result A2";
  }
}

class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return "Result B1";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `B1 collaborates with (${result})`;
  }
}
class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return "Result B2";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `B2 collaborates with (${result})`;
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}
