import { injectable } from 'tsyringe';
import { AppDataSource } from '../config/database';
import { Ticket } from '../models/Ticket';
import { ITicketRepository } from '../interfaces/repositories/ITicketRepository';
import { ITicket } from '../interfaces/ITicket';
import { TicketMapper } from '../mappers/TicketMapper';
import { ObjectId } from 'mongodb';

@injectable()
export class TicketRepository implements ITicketRepository {
  private ormRepository = AppDataSource.getMongoRepository(Ticket);

  async findById(id: string | ObjectId): Promise<ITicket | null> {
    const ticket = await this.ormRepository.findOneBy({ _id: new ObjectId(id) });
    return ticket ? TicketMapper.toDTO(ticket) : null;
  }

  async findByEventId(eventId: string | ObjectId): Promise<ITicket[]> {
    const tickets = await this.ormRepository.find({ where: { eventId: new ObjectId(eventId) } });
    return tickets.map(TicketMapper.toDTO);
  }

  async create(data: Partial<ITicket>): Promise<ITicket> {
    const ticket = this.ormRepository.create(TicketMapper.toEntity(data));
    await this.ormRepository.save(ticket);
    return TicketMapper.toDTO(ticket);
  }

  async update(data: ITicket): Promise<ITicket> {
    const ticket = await this.ormRepository.findOneBy({ _id: new ObjectId(data._id) });
    if (!ticket) throw new Error('Ticket not found');
    const updated = TicketMapper.toEntity(data, ticket);
    await this.ormRepository.save(updated);
    return TicketMapper.toDTO(updated);
  }

  async delete(id: string | ObjectId): Promise<void> {
    await this.ormRepository.delete({ _id: new ObjectId(id) });
  }
}