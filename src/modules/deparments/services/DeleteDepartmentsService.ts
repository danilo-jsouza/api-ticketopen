import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';

@injectable()
export default class DeleteDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new AppError('Department does not exists');
    }
    await this.departmentsRepository.delete(id);
  }
}
