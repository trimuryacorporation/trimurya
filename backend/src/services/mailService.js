import AppConfig from '../config/index.js';
import nodemailer from 'nodemailer';

export function createTransporter() {
  if (!AppConfig.smtp.host || !AppConfig.smtp.user || !AppConfig.smtp.pass) {
    return null;
  }
  return nodemailer.createTransport({
    host: AppConfig.smtp.host,
    port: AppConfig.smtp.port,
    secure: AppConfig.smtp.secure,
    auth: { user: AppConfig.smtp.user, pass: AppConfig.smtp.pass }
  });
}
