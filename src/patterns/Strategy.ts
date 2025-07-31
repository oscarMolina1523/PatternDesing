// 1. Estrategia (interfaz que define el contrato)
interface ShippingStrategy {
  calculate(orderTotal: number): number;
}

// 2. Estrategias concretas
class StandardShipping implements ShippingStrategy {
  calculate(orderTotal: number): number {
    return orderTotal + 5;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(orderTotal: number): number {
    return orderTotal + 15;
  }
}

class FreeShipping implements ShippingStrategy {
  calculate(orderTotal: number): number {
    return orderTotal + 0;
  }
}

// 3. Contexto que usa la estrategia
class ShippingCostCalculator {
    //recibe una estrategia de envío que implemente ShippingStrategy
  // y la almacena en una propiedad privada
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  //se usa para cambiar de estrategia en tiempo de ejecución
  // permite al cliente cambiar la estrategia de envío
  //y calcular el nuevo costo del envío
  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculateCost(orderTotal: number): number {
    return this.strategy.calculate(orderTotal);
  }
}

//ejemplo de uso en cliente
const orderTotal = 100;

const calculator = new ShippingCostCalculator(new StandardShipping());
console.log("Envío estándar:", calculator.calculateCost(orderTotal)); // 105

calculator.setStrategy(new ExpressShipping());
console.log("Envío exprés:", calculator.calculateCost(orderTotal)); // 115

calculator.setStrategy(new FreeShipping());
console.log("Envío gratis:", calculator.calculateCost(orderTotal)); // 100
