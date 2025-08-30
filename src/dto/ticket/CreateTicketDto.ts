import { IsString, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  eventId: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}