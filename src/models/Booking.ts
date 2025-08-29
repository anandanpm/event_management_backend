import{Entity,ObjectIdColumn,Column}from'typeorm';
import{ObjectId}from'mongodb';

@Entity('bookings')
export class Booking{
    @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: ObjectId; 

  @Column()
  ticketId: ObjectId; 

  @Column()
  quantity: number;

  @Column({ default: 'pending' })
  status: string; 

  @Column({ nullable: true })
  stripePaymentId: string; 
}