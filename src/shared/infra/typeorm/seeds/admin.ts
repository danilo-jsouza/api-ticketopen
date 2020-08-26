import { hashSync } from 'bcryptjs';

export const admin = {
  name: 'admin',
  email: 'admin@ticketopen.com',
  password: hashSync('admin@ticketopen', 8),
  rule: 'ADMIN',
};
