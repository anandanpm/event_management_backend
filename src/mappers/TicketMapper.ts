import { Ticket } from '../models/Ticket';
import { ITicket } from '../interfaces/ITicket';
import { ObjectId } from 'mongodb';

export class TicketMapper {
  static toEntity(dto: Partial<ITicket>, existing?: Ticket): Ticket {
    const ticket = existing || new Ticket();
    if (dto._id) ticket._id = new ObjectId(dto._id);
    if (dto.eventId) ticket.eventId = new ObjectId(dto.eventId);
    if (dto.type) ticket.type = dto.type;
    if (dto.price) ticket.price = dto.price;
    if (dto.quantity) ticket.quantity = dto.quantity;
    return ticket;
  }

  static toDTO(ticket: Ticket): ITicket {
    return {
      _id: ticket._id,
      eventId: ticket.eventId,
      type: ticket.type,
      price: ticket.price,
      quantity: ticket.quantity,
    };
  }
}