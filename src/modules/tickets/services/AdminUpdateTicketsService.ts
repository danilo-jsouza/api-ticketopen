import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITicketsRepository from '../repositories/ITicketsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';

interface IRequest {
  id: string;
  recipient_id: string;
}

@injectable()
export default class AdminUpdateTicketsService {
  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({ id, recipient_id }: IRequest): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket does not exist');
    }

    Object.assign(ticket, { recipient_id, status: 2 });

    await this.ticketsRepository.save(ticket);

    return ticket;
  }
}
