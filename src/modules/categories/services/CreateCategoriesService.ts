import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  name: string;
  department_id: string;
}

@injectable()
export default class CreateCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, department_id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      department_id,
    });

    return category;
  }
}
