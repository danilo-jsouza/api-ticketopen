import { Repository, getRepository } from 'typeorm';
import IDepartmentsRepository from '@modules/deparments/repositories/IDepartmentsRepository';
import Department from '../entities/Department';

export default class DepartmentsRepository implements IDepartmentsRepository {
  private ormRepository: Repository<Department>;

  constructor() {
    this.ormRepository = getRepository(Department);
  }

  public async findById(id: string): Promise<Department | undefined> {
    const department = await this.ormRepository.findOne(id);

    return department;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(name: string): Promise<Department> {
    const department = await this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(department);

    return department;
  }

  public async save(deparment: Department): Promise<Department> {
    return this.ormRepository.save(deparment);
  }
}
