import { Entity,ObjectIdColumn,Column } from "typeorm";
import {ObjectId} from 'mongodb'

@Entity('tickets')
export class Ticket {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  eventId: ObjectId;

  @Column()
  type:string

 @Column('double')
  price: number;

  @Column()
  quantity: number;
}