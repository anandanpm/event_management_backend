
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IBookingService } from '../interfaces/services/IBookingService';
import { CreateBookingDto } from '../dto/booking/CreateBookingDto';
import { validates } from '../middleware/validation';


@injectable()
export class BookingController {
  constructor(@inject('BookingService') private bookingService: IBookingService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(CreateBookingDto, req.body);
      const booking = await this.bookingService.create(dto);
      res.status(201).json(booking);
    } catch (error) {
        const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const booking = await this.bookingService.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    res.json(booking);
  }

  async findByUser(req: Request, res: Response): Promise<void> {
    const bookings = await this.bookingService.findByUserId(req.params.id);
    res.json(bookings);
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.bookingService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
        const err  = error as Error
      res.status(400).json({ message: err.message });
    }
  }
}
