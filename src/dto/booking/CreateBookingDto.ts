import { IsNumber,IsString } from "class-validator";

export class CreateBookingDto{
    @IsString()
  ticketId: string;

  @IsNumber()
  quantity: number;
}