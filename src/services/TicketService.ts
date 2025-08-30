
import { injectable, inject } from 'tsyringe';
import { ITicketService } from '../interfaces/services/ITicketService';
import { ITicketRepository } from '../interfaces/repositories/ITicketRepository';
import { CreateTicketDto } from '../dto/ticket/CreateTicketDto';
import { TicketResponseDto } from '../dto/ticket/TicketResponseDto';
import { TicketMapper } from '../mappers/TicketMapper';


@injectable()
export class TicketService implements ITicketService {
  constructor(@inject('TicketRepository') private ticketRepository: ITicketRepository) {}

  async create(dto: CreateTicketDto): Promise<TicketResponseDto> {
    const ticket = await this.ticketRepository.create(dto);
    return { ...TicketMapper.toDTO(ticket), _id: ticket._id.toString(), eventId: ticket.eventId.toString() };
  }

  async findById(id: string): Promise<TicketResponseDto | null> {
    const ticket = await this.ticketRepository.findById(id);
    return ticket ? { ...TicketMapper.toDTO(ticket), _id: ticket._id.toString(), eventId: ticket.eventId.toString() } : null;
  }

  async findByEventId(eventId: string): Promise<TicketResponseDto[]> {
    const tickets = await this.ticketRepository.findByEventId(eventId);
    return tickets.map((t) => ({ ...TicketMapper.toDTO(t), _id: t._id.toString(), eventId: t.eventId.toString() }));
  }

  async delete(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
