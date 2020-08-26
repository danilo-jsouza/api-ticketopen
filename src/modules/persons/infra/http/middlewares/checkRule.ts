import { Request, Response, NextFunction } from 'express';
import FindByIdPersonsService from '@modules/persons/services/FindByIdPersonsService';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

export default async function checkRule(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const person_id = request.body.person.id;

  const findPerson = container.resolve(FindByIdPersonsService);

  const person = await findPerson.execute(person_id);

  if (person.rule === 'ADMIN') {
    next();
  } else {
    throw new AppError('Person not authorized', 401);
  }
}
