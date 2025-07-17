//This is the interface of all A products and what they can do
interface AbstractProductA {
    usefulFunctionA(): string;
}
//This is the interface of all B products and what they can do
interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

//This method defines what type of products can be created with each method
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

//this is the concrete factory of a particular product A1, B1
class ConcreteFactory1 implements AbstractFactory {
    createProductA(): AbstractProductA { return new ConcreteProductA1(); }
    createProductB(): AbstractProductB { return new ConcreteProductB1(); }
}

//this is the concrete factory of a particular product A2, B2
class ConcreteFactory2 implements AbstractFactory {
    createProductA(): AbstractProductA { return new ConcreteProductA2(); }
    createProductB(): AbstractProductB { return new ConcreteProductB2(); }
}
