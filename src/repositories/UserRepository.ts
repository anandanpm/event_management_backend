import { injectable } from 'tsyringe';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IUser, IUserDTO } from '../interfaces/IUser';
import { UserMapper } from '../mappers/UserMapper';
import { ObjectId } from 'mongodb';

@injectable()
export class UserRepository implements IUserRepository {
  private ormRepository = AppDataSource.getMongoRepository(User);

  async findById(id: string | ObjectId): Promise<IUserDTO | null> {
    const user = await this.ormRepository.findOneBy({ _id: new ObjectId(id) });
    return user ? UserMapper.toDTO(user) : null;
  }

  async findByEmail(email: string): Promise<IUserDTO | null> {
    const user = await this.ormRepository.findOneBy({ email });
    return user ? UserMapper.toDTO(user) : null;
  }

  async create(data: Partial<IUser> & { password: string }): Promise<IUserDTO> {
    const user = this.ormRepository.create(UserMapper.toEntity(data));
    await this.ormRepository.save(user);
    return UserMapper.toDTO(user);
  }

  async update(data: Partial<IUser>): Promise<IUserDTO> {
    if (!data._id) throw new Error('User id is required for update');

    const user = await this.ormRepository.findOneBy({ _id: new ObjectId(data._id) });
    if (!user) throw new Error('User not found');

    const updated = UserMapper.toEntity(data, user);
    await this.ormRepository.save(updated);

    return UserMapper.toDTO(updated);
  }
}
