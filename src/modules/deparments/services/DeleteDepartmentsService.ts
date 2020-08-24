import { injectable, inject } from 'tsyringe';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';

@injectable()
export default class DeleteDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.departmentsRepository.delete(id);
  }
}
