import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  EventImage: string;
}