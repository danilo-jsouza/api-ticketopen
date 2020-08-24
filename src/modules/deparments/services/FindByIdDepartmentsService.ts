import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';
import Department from '../infra/typeorm/entities/Department';

@injectable()
export default class FindByIdDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute(id: string): Promise<Department> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new AppError('Department does not exists');
    }

    return department;
  }
}
