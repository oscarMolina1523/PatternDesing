//This method defines what type of products can be created with each method
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}
//This is the interface of all A products and what they can do
interface AbstractProductA {
    usefulFunctionA(): string;
}
//This is the interface of all B products and what they can do
interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}
