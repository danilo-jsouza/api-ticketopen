import { uuid } from 'uuidv4';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import CreateTicketsService from './CreateTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let createTickets: CreateTicketsService;

describe('CreateTickets', () => {
  fakeTicketsRepository = new FakeTicketsRepository();
  createTickets = new CreateTicketsService(fakeTicketsRepository);

  it('should be able to create a new ticket', async () => {
    const ticket = await createTickets.execute({
      category_id: uuid(),
      description: 'Ticket-Description',
      person_id: uuid(),
    });

    expect(ticket).toHaveProperty('id');
  });
});
