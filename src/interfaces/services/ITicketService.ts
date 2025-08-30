import { CreateTicketDto } from "../../dto/ticket/CreateTicketDto";
import { TicketResponseDto } from "../../dto/ticket/TicketResponseDto";

export interface ITicketService {
    create(dto: CreateTicketDto): Promise<TicketResponseDto>;
    findById(id: string): Promise<TicketResponseDto | null>;
    findByEventId(eventId: string): Promise<TicketResponseDto[]>;
    delete(id: string): Promise<void>;
}