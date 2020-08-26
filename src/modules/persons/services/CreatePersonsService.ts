import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IPersonsRepository from '../repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequest {
  name: string;
  email: string;
  password: string;
  department_id: string;
}

@injectable()
export default class CreatePersonsService {
  constructor(
    @inject('PersonsRepository') private personsRepository: IPersonsRepository,
  ) {}

  public async execute({
    password,
    name,
    email,
    department_id,
  }: IRequest): Promise<Person> {
    const checkPersonExists = await this.personsRepository.findByEmail(email);

    if (checkPersonExists) {
      throw new AppError('Email adress already exists.');
    }

    const hashPassword = await hash(password, 8);

    const person = await this.personsRepository.create({
      name,
      email,
      password: hashPassword,
      department_id,
    });

    return person;
  }
}
