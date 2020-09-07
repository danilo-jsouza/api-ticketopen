import ICreateTicketsDTO from '@modules/tickets/dtos/ICreateTicketsDTO';
import Ticket from '@modules/tickets/infra/typeorm/entities/Ticket';
import { uuid } from 'uuidv4';
import ITicketsRepository from '../ITicketsRepository';

export default class FakeTicketsRepository implements ITicketsRepository {
  private tickets: Ticket[] = [];

  public async findById(id: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.find(t => t.id === id);

    return ticket;
  }

  public async findAll(): Promise<Ticket[] | undefined> {
    const tickets = this.tickets.map(t => t);

    return tickets;
  }

  public async create({
    category_id,
    description,
    person_id,
  }: ICreateTicketsDTO): Promise<Ticket> {
    const ticket = new Ticket();

    Object.assign(ticket, { id: uuid(), category_id, person_id, description });

    this.tickets.push(ticket);

    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket> {
    const ticketIndex = this.tickets.findIndex(t => t.id === ticket.id);

    this.tickets[ticketIndex] = ticket;

    return ticket;
  }
}
