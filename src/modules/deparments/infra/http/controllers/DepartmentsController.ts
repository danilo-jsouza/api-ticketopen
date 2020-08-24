import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDepartmentsService from '@modules/deparments/services/CreateDepartmentsService';
import FindByIdDepartmentsService from '@modules/deparments/services/FindByIdDepartmentsService';
import DeleteDepartmentsService from '@modules/deparments/services/DeleteDepartmentsService';
import UpdateDepartmentsService from '@modules/deparments/services/UpdateDepartmentsService';

export default class DepartmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createDepartments = container.resolve(CreateDepartmentsService);

    const department = await createDepartments.execute(name);

    return response.json(department);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdDepartments = container.resolve(FindByIdDepartmentsService);

    const department = await findByIdDepartments.execute(id);

    return response.json(department);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDepartments = container.resolve(DeleteDepartmentsService);

    await deleteDepartments.execute(id);

    return response.json({ message: 'Deleted' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const updateDepartments = container.resolve(UpdateDepartmentsService);

    const department = await updateDepartments.execute({
      id,
      name,
    });

    return response.json(department);
  }
}
