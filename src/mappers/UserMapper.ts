import { User } from '../models/User';
import { IUser,IUserDTO } from '../interfaces/IUser';
import { ObjectId } from 'mongodb';

export class UserMapper {
  static toEntity(dto: Partial<IUser> & { password?: string }, existing?: User): User {
    const user = existing || new User();
    if (dto._id!==undefined) user._id = new ObjectId(dto._id);
    if (dto.name!==undefined) user.name = dto.name;
    if (dto.email!=undefined) user.email = dto.email;
    if (dto.role!==undefined) user.role = dto.role;
    if (dto.password!==undefined) user.password = dto.password;
    return user;
  }

  static toDTO(user: User): IUserDTO {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}