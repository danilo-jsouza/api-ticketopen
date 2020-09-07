import AppError from '@shared/errors/AppError';
import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import FindByIdDepartmentsService from './FindByIdDepartmentsService';

let fakeDepartmentsRepository: FakeDepartmentsRepository;
let findByIdDepartment: FindByIdDepartmentsService;

describe('FindByIdDepartment', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    findByIdDepartment = new FindByIdDepartmentsService(
      fakeDepartmentsRepository,
    );
  });

  it('should be able to show the specific department by id', async () => {
    const department = await fakeDepartmentsRepository.create(
      'Department-Test',
    );

    const departmentById = await findByIdDepartment.execute(department.id);

    expect(departmentById.name).toBe('Department-Test');
  });

  it('should not be able to show the specific department from not-existing department', async () => {
    await expect(
      findByIdDepartment.execute('non-existing-department-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
