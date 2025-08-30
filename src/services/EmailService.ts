import { injectable } from 'tsyringe';
import { IEmailService } from '../interfaces/services/IEmailService';
import { transporter } from '../config/email';

@injectable()
export class EmailService implements IEmailService {
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Event Management',
      text: `Hello ${name},\n\nWelcome to our platform! We're excited to have you.`,
      html: `<p>Hello ${name},</p><p>Welcome to our platform! We're excited to have you.</p>`,
    });
  }

  async sendConfirmationEmail(email: string, bookingId: string): Promise<void> {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation',
      text: `Your booking (ID: ${bookingId}) has been confirmed.`,
      html: `<p>Your booking (ID: ${bookingId}) has been confirmed.</p>`,
    });
  }
}