import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePersonService from '@modules/persons/services/CreatePersonsService';
import FindByIdPersonService from '@modules/persons/services/FindByIdPersonsService';

export default class PersonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, department_id } = request.body;
    const createPerson = container.resolve(CreatePersonService);

    const person = await createPerson.execute({
      email,
      name,
      password,
      department_id,
    });

    delete person.password;

    return response.json(person);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findPerson = container.resolve(FindByIdPersonService);

    const person = await findPerson.execute(id);

    return response.json(person);
  }
}
