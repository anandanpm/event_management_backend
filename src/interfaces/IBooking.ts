 import {ObjectId} from 'mongodb';

 export interface IBooking{
    _id: ObjectId;
    userId: ObjectId;
    ticketId: ObjectId;
    quantity: number;
    status: string;
    stripePaymentId?: string;}