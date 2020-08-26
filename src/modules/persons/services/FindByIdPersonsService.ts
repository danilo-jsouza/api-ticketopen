import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPersonsRepository from '../repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';

@injectable()
export default class FindByIdPersonsService {
  constructor(
    @inject('PersonsRepository') private personsRepository: IPersonsRepository,
  ) {}

  public async execute(id: string): Promise<Person> {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new AppError('Person not exists.');
    }

    return person;
  }
}
