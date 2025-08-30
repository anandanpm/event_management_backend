import { Router } from 'express';
import { container } from 'tsyringe';
import { EventController } from '../controllers/EventController';
import { authenticate } from '../middleware/auth';

const router = Router();
const eventController = container.resolve(EventController);

router.post('/', authenticate, eventController.create.bind(eventController));
router.put('/:id', authenticate, eventController.update.bind(eventController));
router.get('/:id', eventController.findById.bind(eventController));
router.get('/', eventController.findAll.bind(eventController));
router.delete('/:id', authenticate, eventController.delete.bind(eventController));

export default router;