export class AuthResponseDto {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}