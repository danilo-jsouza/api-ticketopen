import { inject, injectable } from 'tsyringe';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

interface IRequest {
  description: string;
  category_id: string;
  person_id: string;
}

@injectable()
export default class CreateTicketsService {
  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    person_id,
    description,
    category_id,
  }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.create({
      person_id,
      category_id,
      description,
    });

    return ticket;
  }
}
