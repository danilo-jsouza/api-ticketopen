import { uuid } from 'uuidv4';
import FakeTicketsRepository from '../repositories/fakes/FakeTicketsRepository';
import FindAllTicketsService from './FindAllTicketsService';

let fakeTicketsRepository: FakeTicketsRepository;
let findAllTickets: FindAllTicketsService;

describe('FindAllTickets', () => {
  beforeEach(() => {
    fakeTicketsRepository = new FakeTicketsRepository();
    findAllTickets = new FindAllTicketsService(fakeTicketsRepository);
  });

  it('should be able to show all tickets', async () => {
    const ticket1 = await fakeTicketsRepository.create({
      category_id: uuid(),
      description: 'Ticket-Description1',
      person_id: uuid(),
    });
    const ticket2 = await fakeTicketsRepository.create({
      category_id: uuid(),
      description: 'Ticket-Description2',
      person_id: uuid(),
    });

    const tickets = await findAllTickets.execute();

    expect(tickets).toEqual([ticket1, ticket2]);
  });
});
