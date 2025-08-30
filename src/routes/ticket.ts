import { Router } from 'express';
import { container } from 'tsyringe';
import { TicketController } from '../controllers/TicketController';
import { authenticate } from '../middleware/auth';

const router = Router();
const ticketController = container.resolve(TicketController);

router.post('/', authenticate, ticketController.create.bind(ticketController));
router.get('/:id', ticketController.findById.bind(ticketController));
router.get('/event/:eventId', ticketController.findByEventId.bind(ticketController));
router.delete('/:id', authenticate, ticketController.delete.bind(ticketController));

export default router;