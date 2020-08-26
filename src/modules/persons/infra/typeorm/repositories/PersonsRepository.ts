import { Repository, getRepository } from 'typeorm';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonsDTO';
import Person from '../entities/Person';

export default class PersonsRepository implements IPersonsRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async findById(id: string): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'rule'],
      relations: ['department'],
    });

    return person;
  }

  public async findByEmail(email: string): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { email },
    });

    return person;
  }

  public async create({
    email,
    name,
    password,
    department_id,
  }: ICreatePersonDTO): Promise<Person> {
    const person = await this.ormRepository.create({
      email,
      name,
      password,
      department_id,
    });

    await this.ormRepository.save(person);
    return person;
  }

  public async save(person: Person): Promise<Person> {
    return this.ormRepository.save(person);
  }
}
