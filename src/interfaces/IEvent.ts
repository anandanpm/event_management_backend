import { ObjectId } from "mongodb";;

export interface IEvent{
    _id: ObjectId;
    title: string;
    description: string;
    date: Date;
    ticketPrice:number;
    ticketQuantity:number;
    organizerId: ObjectId;
    location: string;
    EventImage:string
}