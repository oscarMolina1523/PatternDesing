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

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculateCost(orderTotal: number): number {
    return this.strategy.calculate(orderTotal);
  }
}
