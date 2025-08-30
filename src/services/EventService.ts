  
import { injectable, inject } from 'tsyringe';
import { IEventService } from '../interfaces/services/IEventService';
import { IEventRepository } from '../interfaces/repositories/IEventRepository';
import { CreateEventDto } from '../dto/event/CreateEventDto';
import { UpdateEventDto } from '../dto/event/UpdateEventDto';
import { EventResponseDto } from '../dto/event/EventResponseDto';
import { EventMapper } from '../mappers/EventMapper';

@injectable()
export class EventService implements IEventService {
  constructor(@inject('EventRepository') private eventRepository: IEventRepository) {}

  async create(dto: CreateEventDto): Promise<EventResponseDto> {
    const event = await this.eventRepository.create(dto);
    return { ...EventMapper.toDTO(event), _id: event._id.toString() };
  }

  async update(id: string, dto: UpdateEventDto): Promise<EventResponseDto> {
    let event = await this.eventRepository.findById(id);
    if (!event) throw new Error('Event not found');
    event = { ...event, ...dto };
    const updated = await this.eventRepository.update(event);
    if (!updated) throw new Error("Failed to update event");
    return { ...EventMapper.toDTO(updated), _id: updated._id.toString() };
  }

  async findById(id: string): Promise<EventResponseDto | null> {
    const event = await this.eventRepository.findById(id);
    return event ? { ...EventMapper.toDTO(event), _id: event._id.toString() } : null;
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventRepository.findAll();
    return events.map((e) => ({ ...EventMapper.toDTO(e), _id: e._id.toString() }));
  }

  async delete(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }
}
