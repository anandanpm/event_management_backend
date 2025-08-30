import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { ObjectId } from 'mongodb';

export class UserMapper {
  static toEntity(dto: Partial<IUser> & { password?: string }, existing?: User): User {
    const user = existing || new User();
    if (dto._id) user._id = new ObjectId(dto._id);
    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.role) user.role = dto.role;
    if (dto.password) user.password = dto.password;
    return user;
  }

  static toDTO(user: User): Partial<IUser> {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}