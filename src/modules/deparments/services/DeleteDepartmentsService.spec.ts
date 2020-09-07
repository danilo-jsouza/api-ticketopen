import AppError from '@shared/errors/AppError';
import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import DeleteDepartmentsService from './DeleteDepartmentsService';

let fakeDepartmentsRepository: FakeDepartmentsRepository;
let deleteDepartments: DeleteDepartmentsService;

describe('DeleteDepartments', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    deleteDepartments = new DeleteDepartmentsService(fakeDepartmentsRepository);
  });

  it('should be able to delete departments', async () => {
    const department = await fakeDepartmentsRepository.create(
      'Department-Test',
    );

    const deletedDepartment = jest.spyOn(fakeDepartmentsRepository, 'delete');

    await deleteDepartments.execute(department.id);

    expect(deletedDepartment).toHaveBeenCalledTimes(1);
  });

  it('should not be able to delete departments from non-existing department', async () => {
    await expect(
      deleteDepartments.execute('non-exinsting-department-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
