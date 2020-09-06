import { uuid } from 'uuidv4';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonsDTO';
import IPersonsRepository from '../IPersonsRepository';

export default class FakePersonsRepository implements IPersonsRepository {
  private persons: Person[] = [];

  public async findById(id: string): Promise<Person | undefined> {
    const person = this.persons.find(p => p.id === id);

    return person;
  }

  public async findByEmail(email: string): Promise<Person | undefined> {
    const person = this.persons.find(p => p.email === email);

    return person;
  }

  public async create({
    department_id,
    name,
    email,
    password,
  }: ICreatePersonDTO): Promise<Person> {
    const person = new Person();

    Object.assign(person, { id: uuid(), name, email, password, department_id });

    this.persons.push(person);

    return person;
  }

  public async save(person: Person): Promise<Person> {
    const personIndex = this.persons.findIndex(p => p.id === person.id);

    this.persons[personIndex] = person;

    return person;
  }
}
