import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import UpdateteCategoriesService from './UpdateCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategories: UpdateteCategoriesService;

describe('UpdateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategories = new UpdateteCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to update the category', async () => {
    const category = await fakeCategoriesRepository.create({
      department_id: uuid(),
      name: 'Category-Tes',
    });

    const updatedCategory = await updateCategories.execute({
      id: category.id,
      name: 'Category-Test',
    });

    expect(updatedCategory.name).toBe('Category-Test');
  });

  it('should not be able to update the category from nox-existing-category', async () => {
    await expect(
      updateCategories.execute({
        id: 'no-existing-category-id',
        name: 'Category-Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
