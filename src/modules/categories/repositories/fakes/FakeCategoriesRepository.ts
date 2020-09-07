import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoriesDTO from '@modules/categories/dtos/ICreateCategoriesDTO';
import { uuid } from 'uuidv4';
import ICategoriesRepository from '../ICategoriesRepository';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.categories.find(c => c.id === id);

    return category;
  }

  public async create({
    department_id,
    name,
  }: ICreateCategoriesDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), department_id, name });

    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(c => c.id === category.id);

    this.categories[categoryIndex] = category;

    return category;
  }
}
