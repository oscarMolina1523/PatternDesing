// 1. Estrategia (interfaz que define el contrato)
interface ShippingStrategy {
  calculate(orderTotal: number): number;
}
