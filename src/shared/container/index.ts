import { container } from 'tsyringe';
import IDepartmentsRepository from '@modules/deparments/repositories/IDepartmentsRepository';
import DepartmentsRepository from '@modules/deparments/infra/typeorm/repositories/DepartmentsRepository';

container.registerSingleton<IDepartmentsRepository>(
  'DepartmentsRepository',
  DepartmentsRepository,
);
