import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import CreateDepartmentsService from './CreateDepartmentsService';

let fakeDepartmentsRepository: FakeDepartmentsRepository;
let createDepartments: CreateDepartmentsService;

describe('CreateDepartments', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    createDepartments = new CreateDepartmentsService(fakeDepartmentsRepository);
  });

  it('should be able to create a new departments', async () => {
    const department = await createDepartments.execute('Department-Test');

    expect(department).toHaveProperty('id');
  });
});
