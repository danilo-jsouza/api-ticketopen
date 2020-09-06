import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

interface IRequest {
  id: string;
  status: number;
  category_id: number;
  description: string;
}

@injectable()
export default class UserUpdateTicketsService {
  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    id,
    description,
    category_id,
    status,
  }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket does not exist');
    }

    Object.assign(ticket, { description, status, category_id });

    await this.ticketsRepository.save(ticket);

    return ticket;
  }
}
