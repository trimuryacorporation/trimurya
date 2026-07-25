import ContactMessage from '../models/ContactMessage.js';
import { createTransporter } from '../services/mailService.js';
import AppConfig from '../config/index.js';

export async function createContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.create(req.body);

    const transporter = createTransporter();
    if (transporter && AppConfig.smtp.user) {
      const isQuote = message.type === 'quote';
      const subject = isQuote ? 'New Quote Request from Website' : 'New Contact Inquiry from Website';
      const emailBody = `Name: ${message.name}\nEmail: ${message.email}\nPhone: ${message.phone || 'N/A'}\nCompany: ${message.company || 'N/A'}\nService: ${message.service || 'General Inquiry'}\n${isQuote ? `Budget: ${message.budget || 'N/A'}\nTimeline: ${message.timeline || 'N/A'}\n` : ''}Message:\n${message.message}`;

      await transporter.sendMail({
        from: AppConfig.smtp.user,
        to: isQuote ? AppConfig.smtp.user : AppConfig.smtp.user,
        subject,
        text: emailBody
      });
    }

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}
