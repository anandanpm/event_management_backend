import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IBookingService } from '../interfaces/services/IBookingService';
import { stripe } from '../config/stripe';

@injectable()
export class StripeWebhookController {
  constructor(@inject('BookingService') private bookingService: IBookingService) {}

  async handleWebhook(req: Request, res: Response): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error) {
        const err = error as Error
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    await this.bookingService.handlePaymentWebhook(event);
    res.json({ received: true });
  }
}