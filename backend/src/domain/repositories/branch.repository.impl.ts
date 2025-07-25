import { Branch } from '../entities/branch.entity';
import { BranchRepository } from './branch.repository';
import { BranchModel } from '../../infrastructure/database/models/branch.model';

export class BranchRepositoryImpl implements BranchRepository {
  async create(branch: Branch): Promise<Branch> {
    const created = await BranchModel.create({
      ...branch,
      created_at: branch.created_at || new Date(),
      updated_at: branch.updated_at || new Date(),
    });
    return {
      id: created.getDataValue('id'),
      name: created.getDataValue('name'),
      location: created.getDataValue('location'),
      code: created.getDataValue('code'),
      status: created.getDataValue('status') as 'active' | 'inactive',
      created_at: created.getDataValue('created_at'),
      updated_at: created.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<Branch[]> {
    const branches = await BranchModel.findAll();
    return branches.map(branch => ({
      id: branch.getDataValue('id'),
      name: branch.getDataValue('name'),
      location: branch.getDataValue('location'),
      code: branch.getDataValue('code'),
      status: branch.getDataValue('status') as 'active' | 'inactive',
      created_at: branch.getDataValue('created_at'),
      updated_at: branch.getDataValue('updated_at'),
    }));
  }

  async update(id: number, branch: Partial<Branch>): Promise<Branch> {
    await BranchModel.update(
      {
        ...branch,
        updated_at: new Date(),
      },
      { where: { id } }
    );
    const updated = await BranchModel.findByPk(id);
    if (!updated) {
      throw new Error('Branch not found');
    }
    return {
      id: updated.getDataValue('id'),
      name: updated.getDataValue('name'),
      location: updated.getDataValue('location'),
      code: updated.getDataValue('code'),
      status: updated.getDataValue('status') as 'active' | 'inactive',
      created_at: updated.getDataValue('created_at'),
      updated_at: updated.getDataValue('updated_at'),
    };
  }

  async delete(id: number): Promise<void> {
    await BranchModel.destroy({ where: { id } });
  }
}