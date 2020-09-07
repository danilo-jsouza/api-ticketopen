import AppError from '@shared/errors/AppError';
import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import UpdateDepartmentsService from './UpdateDepartmentsService';

let fakeDepartmentsRepository: FakeDepartmentsRepository;
let updateDepartment: UpdateDepartmentsService;

describe('UpdateDepartments', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    updateDepartment = new UpdateDepartmentsService(fakeDepartmentsRepository);
  });

  it('should be able to update departments', async () => {
    const department = await fakeDepartmentsRepository.create('Department-Tes');

    const udpatedDepartment = await updateDepartment.execute({
      id: department.id,
      name: 'Department-Test',
    });

    expect(udpatedDepartment.name).toBe('Department-Test');
  });

  it('should not be able to update departments from non-existing departments', async () => {
    await expect(
      updateDepartment.execute({
        id: 'non-existing-department',
        name: 'Department-Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
