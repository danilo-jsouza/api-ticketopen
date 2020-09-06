import Ticket from '../infra/typeorm/entities/Ticket';
import ICreateTicketsDTO from '../dtos/ICreateTicketsDTO';

export default interface ITicketsRepository {
  findById(id: string): Promise<Ticket | undefined>;
  findAll(): Promise<Ticket[] | undefined>;
  create(data: ICreateTicketsDTO): Promise<Ticket>;
  save(ticket: Ticket): Promise<Ticket>;
}
