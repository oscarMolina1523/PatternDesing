// 1. Target interface que tu sistema entiende
export interface PaymentGateway {
  processPayment(amount: number): string;
}

// 2. Adaptee: Stripe SDK con interfaz diferente
export class StripeSDK {
  makePayment(value: number): string {
    return `✅ Pago de $${value} procesado con STRIPE.`;
  }
}

// 3. Adaptee: PayPal SDK con interfaz diferente
export class PayPalSDK {
  sendPayment(amount: number): string {
    return `✅ Pago de $${amount} procesado con PAYPAL.`;
  }
}

// 4. Adapter para Stripe que implementa la interfaz esperada
export class StripeAdapter implements PaymentGateway {
  private stripe: StripeSDK;

  constructor(stripe: StripeSDK) {
    this.stripe = stripe;
  }

  processPayment(cantidad: number): string {
    // Traduce la interfaz de Stripe a la que el sistema espera
    return this.stripe.makePayment(cantidad);
  }
}

// 5. Adapter para PayPal que implementa la interfaz esperada
export class PayPalAdapter implements PaymentGateway {
  private paypal: PayPalSDK;

  constructor(paypal: PayPalSDK) {
    this.paypal = paypal;
  }

  processPayment(cantidad: number): string {
    // Traduce la interfaz de PayPal a la que el sistema espera
    return this.paypal.sendPayment(cantidad);
  }
}
