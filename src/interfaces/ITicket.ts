import{ObjectId} from "mongodb";

export interface ITicket{
    _id: ObjectId;
    eventId: ObjectId;
    type:string
    price: number;
    quantity: number;
}