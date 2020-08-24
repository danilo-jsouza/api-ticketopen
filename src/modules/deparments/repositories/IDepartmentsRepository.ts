import Department from '../infra/typeorm/entities/Department';

export default interface IDepartmentsRepository {
  findById(id: string): Promise<Department | undefined>;
  delete(id: string): Promise<void>;
  create(name: string): Promise<Department>;
  save(department: Department): Promise<Department>;
}
