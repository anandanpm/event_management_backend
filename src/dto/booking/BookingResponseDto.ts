export class BookingResponseDto {
  _id: string;
  userId: string;
  ticketId: string;
  quantity: number;
  status: string;
  stripePaymentId?: string;
}