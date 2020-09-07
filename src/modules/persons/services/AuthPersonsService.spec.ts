import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import AuthPersonsService from './AuthPersonsService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakePersonsRepository: FakePersonsRepository;
let fakeHashProvider: FakeHashProvider;
let authPerson: AuthPersonsService;

describe('AuthPerson', () => {
  beforeEach(() => {
    fakePersonsRepository = new FakePersonsRepository();
    fakeHashProvider = new FakeHashProvider();
    authPerson = new AuthPersonsService(
      fakePersonsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const person = await fakePersonsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      department_id: uuid(),
    });

    const response = await authPerson.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.person).toEqual(person);
  });

  it('show not be able to authenticate with non existing person', async () => {
    await expect(
      authPerson.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakePersonsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      department_id: uuid(),
    });

    await expect(
      authPerson.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
