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
