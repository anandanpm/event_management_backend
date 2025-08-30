
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { ITicketService } from '../interfaces/services/ITicketService';
import { CreateTicketDto } from '../dto/ticket/CreateTicketDto';
import { validates } from '../middleware/validation';

@injectable()
export class TicketController {
  constructor(@inject('TicketService') private ticketService: ITicketService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(CreateTicketDto, req.body);
      const ticket = await this.ticketService.create(dto);
      res.status(201).json(ticket);
    } catch (error) {
       const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    const ticket = await this.ticketService.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    res.json(ticket);
  }

  async findByEventId(req: Request, res: Response): Promise<void> {
    const tickets = await this.ticketService.findByEventId(req.params.eventId);
    res.json(tickets);
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.ticketService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
       const err = error as Error
      res.status(400).json({ message: err.message });
    }
  }
}
