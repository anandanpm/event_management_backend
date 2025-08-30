import { Router } from 'express';
import { container } from 'tsyringe';
import { BookingController } from '../controllers/BookController';
import { authenticate } from '../middleware/auth';

const router = Router();
const bookingController = container.resolve(BookingController);

router.post('/', authenticate, bookingController.create.bind(bookingController));
router.get('/:id', authenticate, bookingController.findById.bind(bookingController));
router.get('/user', authenticate, bookingController.findByUser.bind(bookingController));
router.delete('/:id', authenticate, bookingController.delete.bind(bookingController));

export default router;