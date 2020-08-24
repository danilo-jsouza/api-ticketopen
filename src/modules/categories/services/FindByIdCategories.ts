import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
export default class FindByIdCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    return category;
  }
}
