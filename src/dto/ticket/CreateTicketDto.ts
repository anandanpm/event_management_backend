import { IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateTicketDto {
  @IsString()
  eventId: ObjectId;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}