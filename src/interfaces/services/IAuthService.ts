import { LoginDto } from "../../dto/auth/LoginDto";
import { RegisterDto } from "../../dto/auth/RegisterDto";
import { AuthResponseDto } from "../../dto/auth/AuthResponseDto";

export interface IAuthService {
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
}