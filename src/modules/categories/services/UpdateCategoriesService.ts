import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
export default class UpdateteCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category does not exists');
    }

    Object.assign(category, { name });

    await this.categoriesRepository.save(category);

    return category;
  }
}
