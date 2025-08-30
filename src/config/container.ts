
import { container } from 'tsyringe';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { IEventRepository } from '../interfaces/repositories/IEventRepository';
import { EventRepository } from '../repositories/EventRepository';
import { ITicketRepository } from '../interfaces/repositories/ITicketRepository';
import { TicketRepository } from '../repositories/TicketRepository';
import { IBookRepository } from '../interfaces/repositories/IBookRepository';
import { BookingRepository } from '../repositories/BookRepository';
import { IAuthService } from '../interfaces/services/IAuthService';
import { AuthService } from '../services/AuthService';
import { IEventService } from '../interfaces/services/IEventService';
import { EventService } from '../services/EventService';
import { ITicketService } from '../interfaces/services/ITicketService';
import { TicketService } from '../services/TicketService';
import { IBookingService } from '../interfaces/services/IBookingService';
import { BookingService } from '../services/BookingService';
import { IEmailService } from '../interfaces/services/IEmailService';
import { EmailService } from '../services/EmailService';


container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IEventRepository>('EventRepository', EventRepository);
container.registerSingleton<ITicketRepository>('TicketRepository', TicketRepository);
container.registerSingleton<IBookRepository>('BookingRepository', BookingRepository);
container.registerSingleton<IAuthService>('AuthService', AuthService);
container.registerSingleton<IEventService>('EventService', EventService);
container.registerSingleton<ITicketService>('TicketService', TicketService);
container.registerSingleton<IBookingService>('BookingService', BookingService);
container.registerSingleton<IEmailService>('EmailService', EmailService);


