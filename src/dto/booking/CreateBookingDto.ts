import { IsNumber,IsString } from "class-validator";

export class CreateBookingDto{
    @IsString()
  ticketId: string;
  @IsString()
    userId: string;

  @IsNumber()
  quantity: number;
}