
import { injectable, inject } from 'tsyringe';
import { AppDataSource } from '../config/database';
import { IBookingService } from '../interfaces/services/IBookingService';
import { IBookRepository } from '../interfaces/repositories/IBookRepository'
import { ITicketRepository } from '../interfaces/repositories/ITicketRepository';
import { IEmailService } from '../interfaces/services/IEmailService';
import { CreateBookingDto } from '../dto/booking/CreateBookingDto';
import { BookingResponseDto } from '../dto/booking/BookingResponseDto';
import { BookingMapper } from '../mappers/BookingMapper';
import { stripe } from '../config/stripe';
import { ObjectId } from 'mongodb';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';

@injectable()
export class BookingService implements IBookingService {
  constructor(
    @inject('BookingRepository') private bookingRepository: IBookRepository,
    @inject('TicketRepository') private ticketRepository: ITicketRepository,
    @inject('EmailService') private emailService: IEmailService,
  ) {}

  async create(dto: CreateBookingDto): Promise<BookingResponseDto> {
    const ticket = await this.ticketRepository.findById(dto.ticketId);
    if (!ticket) throw new Error('Ticket not found');
    if (ticket.quantity < dto.quantity) throw new Error('Insufficient ticket quantity');

    const booking = await this.bookingRepository.create({
      userId: new ObjectId(dto.userId),
      ticketId: new ObjectId(dto.ticketId),
      quantity: dto.quantity,
      status: 'pending',
    });

    const ticketEntity = await AppDataSource.getMongoRepository(Ticket).findOneBy({ _id: new ObjectId(dto.ticketId) });
    if (!ticketEntity) throw new Error('Ticket not found');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ticket: ${ticket.type}`,
            },
            unit_amount: Math.round(ticket.price * 100),
          },
          quantity: dto.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    await this.bookingRepository.update({
      ...booking,
      stripePaymentId: session.id,
    });

    return {
      ...BookingMapper.toDTO(booking),
      _id: booking._id.toString(),
      userId: booking.userId.toString(),
      ticketId: booking.ticketId.toString(),
    };
  }

  async findById(id: string): Promise<BookingResponseDto | null> {
    const booking = await this.bookingRepository.findById(id);
    return booking
      ? {
          ...BookingMapper.toDTO(booking),
          _id: booking._id.toString(),
          userId: booking.userId.toString(),
          ticketId: booking.ticketId.toString(),
        }
      : null;
  }

  async findByUserId(userId: string): Promise<BookingResponseDto[]> {
    const bookings = await this.bookingRepository.findByUserId(userId);
    return bookings.map((b) => ({
      ...BookingMapper.toDTO(b),
      _id: b._id.toString(),
      userId: b.userId.toString(),
      ticketId: b.ticketId.toString(),
    }));
  }

  async handlePaymentWebhook(event: any): Promise<void> {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session.metadata.bookingId;
      const booking = await this.bookingRepository.findById(bookingId);
      if (!booking) throw new Error('Booking not found');

      const ticket = await this.ticketRepository.findById(booking.ticketId.toString());
      if (!ticket) throw new Error('Ticket not found');

      await this.bookingRepository.update({ ...booking, status: 'paid' });
      await this.ticketRepository.update({
        ...ticket,
        quantity: ticket.quantity - booking.quantity,
      });

      const user = await AppDataSource.getMongoRepository(User).findOneBy({ _id: new ObjectId(booking.userId) });
      if (user) {
        await this.emailService.sendConfirmationEmail(user.email, bookingId);
      }
    }
  }

  async delete(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
