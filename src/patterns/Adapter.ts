//🔷 3. Adapter
// It is used to adapt the third-party implementation code to what the
// client expects, that is, it allows us to override a method without problems.
//more info in my notion: https://www.notion.so/Desing-Pattern-2337c9c9fb1780f9a277c47d6fc37878?source=copy_link

// this is the base interface by defect
export interface PaymentGateway {
  processPayment(amount: number): string;
}

// class defect of stripe 
export class StripeSDK {
  makePayment(value: number): string {
    return `✅ Pago de $${value} procesado con STRIPE.`;
  }
}

// class defect of paypal
export class PayPalSDK {
  sendPayment(amount: number): string {
    return `✅ Pago de $${amount} procesado con PAYPAL.`;
  }
}

// We created an adapter for Stripe to be able to use the method name and only change the implementation.
export class StripeAdapter implements PaymentGateway {
  private stripe: StripeSDK;

  constructor(stripe: StripeSDK) {
    this.stripe = stripe;
  }

  processPayment(cantidad: number): string {
    // we use the method of stripe without any problem
    return this.stripe.makePayment(cantidad);
  }
}

// We created an adapter for PayPal to be able to use the method name and only change the implementation.
export class PayPalAdapter implements PaymentGateway {
  private paypal: PayPalSDK;

  constructor(paypal: PayPalSDK) {
    this.paypal = paypal;
  }

  processPayment(cantidad: number): string {
    // we use the method of paypal without any problem
    return this.paypal.sendPayment(cantidad);
  }
}
