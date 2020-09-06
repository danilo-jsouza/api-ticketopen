import { Repository, getRepository } from 'typeorm';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import ICreateTicketsDTO from '@modules/tickets/dtos/ICreateTicketsDTO';
import Ticket from '../entities/Ticket';

export default class TicketsRepository implements ITicketsRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getRepository(Ticket);
  }

  public async findById(id: string): Promise<Ticket | undefined> {
    const ticket = await this.ormRepository.findOne({
      where: { id },
      select: [
        'id',
        'status',
        'description',
        'created_at',
        'category',
        'person',
        'recipient',
      ],
      relations: ['recipient', 'person'],
    });

    return ticket;
  }

  public async findAll(): Promise<Ticket[] | undefined> {
    const ticket = await this.ormRepository.find({
      select: [
        'id',
        'status',
        'description',
        'created_at',
        'category',
        'person',
        'recipient',
      ],
      relations: ['recipient', 'person'],
      order: {
        created_at: 'DESC',
      },
    });

    return ticket;
  }

  public async create({
    category_id,
    description,
    person_id,
  }: ICreateTicketsDTO): Promise<Ticket> {
    const ticket = await this.ormRepository.create({
      category_id,
      description,
      person_id,
      status: 1,
      recipient_id: person_id,
    });

    await this.ormRepository.save(ticket);

    return ticket;
  }

  public async save(ticket: Ticket): Promise<Ticket> {
    return this.ormRepository.save(ticket);
  }
}
