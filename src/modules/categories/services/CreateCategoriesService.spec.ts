import { uuid } from 'uuidv4';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesService from './CreateCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategories: CreateCategoriesService;

describe('CreateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategories = new CreateCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategories.execute({
      department_id: uuid(),
      name: 'Category-Test',
    });

    expect(category).toHaveProperty('id');
  });
});
