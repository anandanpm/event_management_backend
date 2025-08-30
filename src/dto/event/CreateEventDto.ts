import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  location: string;

  @IsNumber()
  ticketPrice: number;

  @IsNumber()
  ticketQuantity: number;

  @IsOptional()
  @IsString()
  EventImage: string;
}