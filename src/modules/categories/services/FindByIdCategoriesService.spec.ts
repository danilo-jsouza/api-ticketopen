import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import FindByIdCategoriesService from './FindByIdCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let findByIdCategories: FindByIdCategoriesService;

describe('FindByIdCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    findByIdCategories = new FindByIdCategoriesService(
      fakeCategoriesRepository,
    );
  });

  it('should be able to show the specific category by id', async () => {
    const category = await fakeCategoriesRepository.create({
      department_id: uuid(),
      name: 'Category-Test',
    });

    const categoryById = await findByIdCategories.execute(category.id);

    expect(categoryById.name).toBe('Category-Test');
  });

  it('should not be able to show the specific category from not-existing category', async () => {
    await expect(
      findByIdCategories.execute('no-existing-category-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
