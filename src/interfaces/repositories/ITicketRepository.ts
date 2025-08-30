import { ITicket } from '../ITicket';

export interface ITicketRepository {
  findById(id:string): Promise<ITicket | null>;
  findByEventId(eventId:string): Promise<ITicket[]>;
  create(ticket: Partial<ITicket>): Promise<ITicket>;
  update(ticket: ITicket): Promise<ITicket>;
  delete(id:string): Promise<void>;
}