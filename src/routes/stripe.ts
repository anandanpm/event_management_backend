import { Router } from 'express';
import { container } from 'tsyringe';
import { StripeWebhookController } from '../controllers/StripeWebhookController';
import express from 'express';

const router = Router();
const stripeWebhookController = container.resolve(StripeWebhookController);

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookController.handleWebhook.bind(stripeWebhookController));

export default router;