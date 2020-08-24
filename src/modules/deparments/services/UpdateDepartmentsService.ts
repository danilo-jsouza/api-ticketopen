import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';
import Department from '../infra/typeorm/entities/Department';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
export default class UpdateDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Department> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new AppError('Department does not exists');
    }

    Object.assign(department, { name });

    await this.departmentsRepository.save(department);

    return department;
  }
}
