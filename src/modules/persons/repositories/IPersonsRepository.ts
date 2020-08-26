import Person from '../infra/typeorm/entities/Person';
import ICreatePersonDTO from '../dtos/ICreatePersonsDTO';

export default interface IPersonsRepository {
  findById(id: string): Promise<Person | undefined>;
  findByEmail(email: string): Promise<Person | undefined>;
  create(data: ICreatePersonDTO): Promise<Person>;
  save(person: Person): Promise<Person>;
}
