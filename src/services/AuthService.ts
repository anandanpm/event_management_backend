import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import { IAuthService } from '../interfaces/services/IAuthService';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IEmailService } from '../interfaces/services/IEmailService';
import { RegisterDto } from '../dto/auth/RegisterDto';
import { LoginDto } from '../dto/auth/LoginDto';
import { AuthResponseDto } from '../dto/auth/AuthResponseDto';
import { signToken } from '../utils/jwt';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('EmailService') private emailService: IEmailService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      role: 'user',
      password: hashedPassword,
    });

    await this.emailService.sendWelcomeEmail(dto.email, dto.name);

    const token = signToken({ id: user._id.toString(), role: user.role });
    return { token, user: { ...user, _id: user._id.toString() } };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const userEntity = await AppDataSource.getMongoRepository(User).findOneBy({ email: dto.email });
    if (!userEntity || !(await bcrypt.compare(dto.password, userEntity.password))) {
      throw new Error('Invalid credentials');
    }

    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new Error('User not found');

    const token = signToken({ id: user._id.toString(), role: user.role });
    return { token, user: { ...user, _id: user._id.toString() } };
  }
}