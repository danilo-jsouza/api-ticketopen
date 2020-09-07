import { container } from 'tsyringe';
import IDepartmentsRepository from '@modules/deparments/repositories/IDepartmentsRepository';
import DepartmentsRepository from '@modules/deparments/infra/typeorm/repositories/DepartmentsRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import PersonsRepository from '@modules/persons/infra/typeorm/repositories/PersonsRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import '@modules/persons/providers';

container.registerSingleton<IDepartmentsRepository>(
  'DepartmentsRepository',
  DepartmentsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);

container.registerSingleton<ITicketsRepository>(
  'TicketsRepository',
  TicketsRepository,
);
