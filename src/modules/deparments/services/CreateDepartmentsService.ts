import { injectable, inject } from 'tsyringe';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';
import Department from '../infra/typeorm/entities/Department';

@injectable()
export default class CreateDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute(name: string): Promise<Department> {
    const department = await this.departmentsRepository.create(name);

    return department;
  }
}
