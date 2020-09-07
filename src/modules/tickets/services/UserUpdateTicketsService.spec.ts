import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import UserUpdateTicketsService from './UserUpdateTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let userUpdateTicket: UserUpdateTicketsService;

describe('UserUpdateService', () => {
  beforeEach(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    userUpdateTicket = new UserUpdateTicketsService(fakeTicketsRepository);
  });

  it('should be able user to update ticket', async () => {
    const ticket = await fakeTicketsRepository.create({
      category_id: uuid(),
      description: 'Ticket-Description',
      person_id: uuid(),
    });

    const updatedUserTicket = await userUpdateTicket.execute({
      category_id: 1,
      description: 'Ticket-Desc',
      id: ticket.id,
      status: 2,
    });

    expect(updatedUserTicket.description).toBe('Ticket-Desc');
  });

  it('should not be able user to update ticket from non-existing ticket', async () => {
    await expect(
      userUpdateTicket.execute({
        id: 'non-existing-ticket-id',
        category_id: 1,
        description: 'desc',
        status: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
