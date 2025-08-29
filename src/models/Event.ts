import {Entity,ObjectIdColumn,Column} from 'typeorm';
import {ObjectId} from 'mongodb';

@Entity('events')
export class Event{
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column({nullable:true})
     EventImage:string
}