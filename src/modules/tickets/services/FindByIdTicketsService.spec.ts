import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import FindByIdTicketsService from './FindByIdTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let findByIdTicket: FindByIdTicketsService;

describe('FindByIdTicket', () => {
  beforeEach(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    findByIdTicket = new FindByIdTicketsService(fakeTicketsRepository);
  });

  it('should be able to show the specific ticket by id', async () => {
    const ticket = await fakeTicketsRepository.create({
      category_id: uuid(),
      description: 'Ticket-Description',
      person_id: uuid(),
    });

    const ticketById = await findByIdTicket.execute(ticket.id);

    expect(ticketById.description).toBe('Ticket-Description');
  });

  it('should not be able to show the specific ticket from not-existing ticket', async () => {
    await expect(
      findByIdTicket.execute('non-existing-ticket-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
