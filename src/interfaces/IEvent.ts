import { ObjectId } from "mongodb";;

export interface IEvent{
    _id: ObjectId;
    title: string;
    description: string;
    date: Date;
    location: string;
    EventImage?:string

}