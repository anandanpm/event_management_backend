import { Event } from '../models/Event';
import { IEvent } from '../interfaces/IEvent';
import { ObjectId } from 'mongodb';

export class EventMapper {
  static toEntity(dto: Partial<IEvent>, existing?: Event): Event {
    const event = existing || new Event();
    if (dto._id) event._id = new ObjectId(dto._id);
    if (dto.title) event.title = dto.title;
    if (dto.description) event.description = dto.description;
    if (dto.date) event.date = new Date(dto.date);
    if (dto.location) event.location = dto.location;
    if (dto.EventImage) event.EventImage = dto.EventImage;
    return event;
  }

  static toDTO(event: Event): IEvent {
    return {
      _id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      EventImage: event.EventImage,
    };
  }
}