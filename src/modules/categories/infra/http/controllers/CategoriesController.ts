import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';
import FindByIdCategoriesService from '@modules/categories/services/FindByIdCategoriesService';
import UpdateteCategoriesService from '@modules/categories/services/UpdateCategoriesService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, department_id } = request.body;

    const createCategories = container.resolve(CreateCategoriesService);

    const category = await createCategories.execute({
      department_id,
      name,
    });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdCategory = container.resolve(FindByIdCategoriesService);

    const category = await findByIdCategory.execute(id);

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const updateCategory = container.resolve(UpdateteCategoriesService);

    const category = await updateCategory.execute({
      id,
      name,
    });

    return response.json(category);
  }
}
