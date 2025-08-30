import { IEvent } from "../IEvent";

export interface IEventRepository{
    findById(id:string):Promise<IEvent | null>;
    findAll():Promise<IEvent[]>;
    create(event:Partial<IEvent>):Promise<IEvent>;
    update(event:IEvent):Promise<IEvent | null>;
    delete(id:string):Promise<void>;}