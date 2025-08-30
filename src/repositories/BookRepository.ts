
import { injectable } from 'tsyringe';
import { AppDataSource } from '../config/database';
import { Booking } from '../models/Booking';
import { IBookRepository } from '../interfaces/repositories/IBookRepository';
import { IBooking } from '../interfaces/IBooking';
import { BookingMapper } from '../mappers/BookingMapper';
import { ObjectId } from 'mongodb';

@injectable()
export class BookingRepository implements IBookRepository {
  private ormRepository = AppDataSource.getMongoRepository(Booking);

  async findById(id: string | ObjectId): Promise<IBooking | null> {
    const booking = await this.ormRepository.findOneBy({ _id: new ObjectId(id) });
    return booking ? BookingMapper.toDTO(booking) : null;
  }

  async findByUserId(userId: string | ObjectId): Promise<IBooking[]> {
    const bookings = await this.ormRepository.find({ where: { userId: new ObjectId(userId) } });
    return bookings.map(BookingMapper.toDTO);
  }

  async create(data: Partial<IBooking>): Promise<IBooking> {
    const booking = this.ormRepository.create(BookingMapper.toEntity(data));
    await this.ormRepository.save(booking);
    return BookingMapper.toDTO(booking);
  }

  async update(data: IBooking): Promise<IBooking> {
    const booking = await this.ormRepository.findOneBy({ _id: new ObjectId(data._id) });
    if (!booking) throw new Error('Booking not found');
    const updated = BookingMapper.toEntity(data, booking);
    await this.ormRepository.save(updated);
    return BookingMapper.toDTO(updated);
  }

  async delete(id: string | ObjectId): Promise<void> {
    await this.ormRepository.delete({ _id: new ObjectId(id) });
  }
}
