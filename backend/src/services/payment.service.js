import Stripe from 'stripe';
import config from '../config/index.js';

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2024-06-20',
});

export async function createPaymentIntent({ amount, currency = 'usd', metadata = {} }) {
  // Placeholder implementation - do not use real keys in development without securing environment
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata,
  });
}

export async function verifyWebhookSignature(_payload, _signature) {
  // Implement when webhooks are wired. Left intentionally blank as placeholder.
  return true;
}






