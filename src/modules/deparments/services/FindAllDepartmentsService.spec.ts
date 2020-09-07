import FakeDepartmentsRepository from '../repositories/fakes/FakeDepartmentsRepository';
import FindAllDepartmentsService from './FindAllDepartmentsService';

let fakeDepartmentsRepository: FakeDepartmentsRepository;
let findAllDepartment: FindAllDepartmentsService;

describe('FindAllDepartments', () => {
  beforeEach(() => {
    fakeDepartmentsRepository = new FakeDepartmentsRepository();
    findAllDepartment = new FindAllDepartmentsService(
      fakeDepartmentsRepository,
    );
  });

  it('should be able to show all departments', async () => {
    const department1 = await fakeDepartmentsRepository.create(
      'Department-Test1',
    );
    const department2 = await fakeDepartmentsRepository.create(
      'Department-Test2',
    );

    const departments = await findAllDepartment.execute();

    expect(departments).toEqual([department1, department2]);
  });
});
