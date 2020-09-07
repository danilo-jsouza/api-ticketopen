import Department from '@modules/deparments/infra/typeorm/entities/Department';
import { uuid } from 'uuidv4';
import IDepartmentsRepository from '../IDepartmentsRepository';

export default class FakeDepartmentsRepository
  implements IDepartmentsRepository {
  private departments: Department[] = [];

  public async findById(id: string): Promise<Department | undefined> {
    const deparment = this.departments.find(d => d.id === id);

    return deparment;
  }

  public async findAll(): Promise<Department[] | undefined> {
    const departments = this.departments.map(d => d);

    return departments;
  }

  public async delete(id: string): Promise<void> {
    const departmentIndex = this.departments.findIndex(d => d.id === id);

    this.departments.splice(departmentIndex, 1);
  }

  public async create(name: string): Promise<Department> {
    const department = new Department();

    Object.assign(department, { id: uuid(), name });

    this.departments.push(department);

    return department;
  }

  public async save(department: Department): Promise<Department> {
    const departmentIndex = this.departments.findIndex(
      d => d.id === department.id,
    );

    this.departments[departmentIndex] = department;

    return department;
  }
}
