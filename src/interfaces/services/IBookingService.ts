import { CreateBookingDto } from '../../dto/booking/CreateBookingDto';
import { BookingResponseDto } from '../../dto/booking/BookingResponseDto';

export interface IBookingService {
  create(dto: CreateBookingDto): Promise<BookingResponseDto>;
  findById(id: string): Promise<BookingResponseDto | null>;
  findByUserId(userId: string): Promise<BookingResponseDto[]>;
  handlePaymentWebhook(event: any): Promise<void>;
  delete(id: string): Promise<void>;
}