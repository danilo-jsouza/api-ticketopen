import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import AdminUpdateTicketsService from './AdminUpdateTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let adminUpdateTicket: AdminUpdateTicketsService;

describe('AdminUpdateService', () => {
  beforeEach(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    adminUpdateTicket = new AdminUpdateTicketsService(fakeTicketsRepository);
  });

  it('should be able admin to update ticket', async () => {
    const ticket = await fakeTicketsRepository.create({
      category_id: uuid(),
      description: 'Ticket-Description',
      person_id: uuid(),
    });

    const adminUpdatedTicket = await adminUpdateTicket.execute({
      id: ticket.id,
      recipient_id: 'recipient_id',
    });

    expect(adminUpdatedTicket.recipient_id).toBe('recipient_id');
  });

  it('should not be able admin to update ticket from non-existing ticket', async () => {
    await expect(
      adminUpdateTicket.execute({
        id: 'non-existing-ticket-id',
        recipient_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
