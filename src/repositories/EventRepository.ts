
import { injectable } from 'tsyringe';
import { AppDataSource } from '../config/database';
import { Event } from '../models/Event';
import { IEventRepository } from '../interfaces/repositories/IEventRepository';
import { IEvent } from '../interfaces/IEvent';
import { EventMapper } from '../mappers/EventMapper';
import { ObjectId } from 'mongodb';

@injectable()
export class EventRepository implements IEventRepository {
  private ormRepository = AppDataSource.getMongoRepository(Event);

  async findById(id: string | ObjectId): Promise<IEvent | null> {
    const event = await this.ormRepository.findOneBy({ _id: new ObjectId(id) });
    return event ? EventMapper.toDTO(event) : null;
  }

  async findAll(): Promise<IEvent[]> {
    const events = await this.ormRepository.find();
    return events.map(EventMapper.toDTO);
  }

  async create(data: Partial<IEvent>): Promise<IEvent> {
    const event = this.ormRepository.create(EventMapper.toEntity(data));
    await this.ormRepository.save(event);
    return EventMapper.toDTO(event);
  }

  async update(data: IEvent): Promise<IEvent> {
    const event = await this.ormRepository.findOneBy({ _id: new ObjectId(data._id) });
    if (!event) throw new Error('Event not found');
    const updated = EventMapper.toEntity(data, event);
    await this.ormRepository.save(updated);
    return EventMapper.toDTO(updated);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ _id: new ObjectId(id) });
  }
}
