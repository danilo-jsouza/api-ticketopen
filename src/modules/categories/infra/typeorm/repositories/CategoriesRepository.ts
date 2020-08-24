import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateCategoriesDTO from '@modules/categories/dtos/ICreateCategoriesDTO';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { id },
      select: ['id', 'name'],
      relations: ['departments'],
      order: {
        name: 'DESC',
      },
    });

    return category;
  }

  public async create({
    department_id,
    name,
  }: ICreateCategoriesDTO): Promise<Category> {
    const category = await this.ormRepository.create({
      name,
      department_id,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}
