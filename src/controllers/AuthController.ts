import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/services/IAuthService';
import { RegisterDto } from '../dto/auth/RegisterDto';
import { LoginDto } from '../dto/auth/LoginDto';
import { validates } from '../middleware/validation';

@injectable()
export class AuthController {
  constructor(@inject('AuthService') private authService: IAuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(RegisterDto, req.body);
      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (error) {
        const err = error as Error
      res.status(400).json({ message:  err.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const dto = await validates(LoginDto, req.body);
      const result = await this.authService.login(dto);
      res.json(result);
    } catch (error:unknown) {
        const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }
}