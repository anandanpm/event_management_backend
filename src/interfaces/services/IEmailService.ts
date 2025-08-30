export interface IEmailService {
   sendConfirmationEmail(email: string, bookingId: string): Promise<void>;
   sendWelcomeEmail(email: string, name: string): Promise<void>;
}