import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;


  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  location?: string;

 
  @IsString()
  EventImage?: string;
}