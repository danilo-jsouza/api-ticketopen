import { injectable, inject } from 'tsyringe';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

@injectable()
export default class FindAllTicketsService {
  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute(): Promise<Ticket[] | undefined> {
    const tickets = await this.ticketsRepository.findAll();

    return tickets;
  }
}
