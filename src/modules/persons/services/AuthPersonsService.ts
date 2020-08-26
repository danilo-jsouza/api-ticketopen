import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import IPersonsRepository from '../repositories/IPersonsRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  person: Person;
  token: string;
}

@injectable()
export default class AuthPersonsService {
  constructor(
    @inject('PersonsRepository') private personsRepository: IPersonsRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const person = await this.personsRepository.findByEmail(email);

    if (!person) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passMatched = await compare(password, person.password);

    if (!passMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: person.id,
      expiresIn,
    });

    return {
      token,
      person,
    };
  }
}
