import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import CreatePersonsService from './CreatePersonsService';

let fakePersonsRepository: FakePersonsRepository;
let createPerson: CreatePersonsService;

describe('CreatePerson', () => {
  beforeEach(() => {
    fakePersonsRepository = new FakePersonsRepository();
    createPerson = new CreatePersonsService(fakePersonsRepository);
  });

  it('should be able to create a new person', async () => {
    const person = await createPerson.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      department_id: uuid(),
    });

    expect(person).toHaveProperty('id');
  });

  it('should not be able to create a new person with same email from another', async () => {
    await createPerson.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      department_id: uuid(),
    });

    await expect(
      createPerson.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        department_id: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
