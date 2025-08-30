import { CreateEventDto } from "../../dto/event/CreateEventDto";
import { UpdateEventDto } from "../../dto/event/UpdateEventDto";
import { EventResponseDto } from "../../dto/event/EventResponseDto";

export interface IEventService {
    create(dto: CreateEventDto): Promise<EventResponseDto>;
    update(id: string, dto: UpdateEventDto): Promise<EventResponseDto>;
    findById(id: string): Promise<EventResponseDto | null>;
    findAll(): Promise<EventResponseDto[]>;
    delete(id: string): Promise<void>;
}