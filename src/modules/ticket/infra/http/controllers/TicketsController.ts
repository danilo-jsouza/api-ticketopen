import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTicketsService from '@modules/ticket/services/CreateTicketsService';
import FindAllTicketsService from '@modules/ticket/services/FindAllTicketsService';
import FindByIdTicketsService from '@modules/ticket/services/FindByIdTicketsService';
import AdminUpdateTicketsService from '@modules/ticket/services/AdminUpdateTicketsService';
import UserUpdateTicketsService from '@modules/ticket/services/UserUpdateTicketsService';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, category_id } = request.body;
    const person_id = request.body.person.id;

    const createTicket = container.resolve(CreateTicketsService);

    const ticket = await createTicket.execute({
      description,
      category_id,
      person_id,
    });

    return response.json(ticket);
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const findAllTickets = container.resolve(FindAllTicketsService);

    const tickets = await findAllTickets.execute();

    return response.json(tickets);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findByIdTickets = container.resolve(FindByIdTicketsService);

    const ticket = await findByIdTickets.execute(id);

    return response.json(ticket);
  }

  public async adiminUpdate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, recipient_id } = request.body;

    const adiminUpdate = container.resolve(AdminUpdateTicketsService);

    const ticket = await adiminUpdate.execute({
      id,
      recipient_id,
    });

    return response.json(ticket);
  }

  public async userUpdate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, status, category_id, description } = request.body;

    const userUpdate = container.resolve(UserUpdateTicketsService);

    const ticket = await userUpdate.execute({
      category_id,
      description,
      id,
      status,
    });

    return response.json(ticket);
  }
}
