import { injectable, inject } from 'tsyringe';
import IDepartmentsRepository from '../repositories/IDepartmentsRepository';
import Department from '../infra/typeorm/entities/Department';

@injectable()
export default class FindAllDepartmentsService {
  constructor(
    @inject('DepartmentsRepository')
    private departmentsRepository: IDepartmentsRepository,
  ) {}

  public async execute(): Promise<Department[] | undefined> {
    const department = await this.departmentsRepository.findAll();

    return department;
  }
}
