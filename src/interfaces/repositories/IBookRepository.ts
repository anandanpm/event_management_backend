import { IBooking } from "../IBooking";

export interface IBookRepository{
    findById(id:string):Promise<IBooking | null>;
    findByUserId(userId:string):Promise<IBooking[]>;
    create(booking:Partial<IBooking>):Promise<IBooking>;
    update(booking:IBooking):Promise<IBooking>;
    delete(id:string):Promise<void>;
   }