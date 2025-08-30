import { Booking } from '../models/Booking';
import { IBooking } from '../interfaces/IBooking';
import { ObjectId } from 'mongodb';

export class BookingMapper {
  static toEntity(dto: Partial<IBooking>, existing?: Booking): Booking {
    const booking = existing || new Booking();
    if (dto._id) booking._id = new ObjectId(dto._id);
    if (dto.userId) booking.userId = new ObjectId(dto.userId);
    if (dto.ticketId) booking.ticketId = new ObjectId(dto.ticketId);
    if (dto.quantity) booking.quantity = dto.quantity;
    if (dto.status) booking.status = dto.status;
    if (dto.stripePaymentId) booking.stripePaymentId = dto.stripePaymentId;
    return booking;
  }

  static toDTO(booking: Booking): IBooking {
    return {
      _id: booking._id,
      userId: booking.userId,
      ticketId: booking.ticketId,
      quantity: booking.quantity,
      status: booking.status,
      stripePaymentId: booking.stripePaymentId,
    };
  }
}