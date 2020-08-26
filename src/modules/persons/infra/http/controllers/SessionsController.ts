import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthPersonService from '@modules/persons/services/AuthPersonsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticatedUser = container.resolve(AuthPersonService);

    const { person, token } = await authenticatedUser.execute({
      email,
      password,
    });

    delete person.password;

    return response.json({ person, token });
  }
}
