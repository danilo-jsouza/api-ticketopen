import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import FindByIdPersonsService from './FindByIdPersonsService';

let fakePersonsRepostiroy: FakePersonsRepository;
let findByIdPersonsService: FindByIdPersonsService;

describe('FindByIdPerson', () => {
  beforeEach(() => {
    fakePersonsRepostiroy = new FakePersonsRepository();

    findByIdPersonsService = new FindByIdPersonsService(fakePersonsRepostiroy);
  });

  it('should be able to show the especific person by id', async () => {
    const person = await fakePersonsRepostiroy.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      department_id: uuid(),
    });

    const personById = await findByIdPersonsService.execute(person.id);

    expect(personById.email).toBe('johndoe@example.com');
    expect(personById.name).toBe('John Doe');
  });

  it('show not be able to show the especific person by id', async () => {
    await expect(
      findByIdPersonsService.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
