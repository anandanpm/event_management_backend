
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IEventService } from '../interfaces/services/IEventService';
import { CreateEventDto } from '../dto/event/CreateEventDto';
import { UpdateEventDto } from '../dto/event/UpdateEventDto';
import { validates } from '../middleware/validation';


@injectable()
export class EventController {
  constructor(@inject('EventService') private eventService: IEventService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(CreateEventDto, req.body);
      const event = await this.eventService.create(dto);
      res.status(201).json(event);
    } catch (error:unknown) {
        const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(UpdateEventDto, req.body);
      const event = await this.eventService.update(req.params.id, dto);
      res.json(event);
    } catch (error) {
        const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const event = await this.eventService.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const events = await this.eventService.findAll();
    res.json(events);
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.eventService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
        const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }
}
