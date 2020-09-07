import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPersonsRepository from '../repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
    @inject('HashProvider') private hashProvider: IHashProvider,
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

    const hashPassword = await this.hashProvider.generateHash(password);

    const person = await this.personsRepository.create({
      name,
      email,
      password: hashPassword,
      department_id,
    });

    return person;
  }
}
