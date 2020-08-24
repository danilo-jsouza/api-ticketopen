import Category from '../infra/typeorm/entities/Category';
import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

export default interface ICategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoriesDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
