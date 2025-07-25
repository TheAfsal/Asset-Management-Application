import { AssetCategory } from '../entities/asset-category.entity';
import { AssetCategoryRepository } from './asset-category.repository';
import { AssetCategoryModel } from '../../infrastructure/database/models/asset-category.model';

export class AssetCategoryRepositoryImpl implements AssetCategoryRepository {
  async create(category: AssetCategory): Promise<AssetCategory> {
    const created = await AssetCategoryModel.create({
      ...category,
      created_at: category.created_at || new Date(),
      updated_at: category.updated_at || new Date(),
    });
    return {
      id: created.getDataValue('id'),
      name: created.getDataValue('name'),
      description: created.getDataValue('description'),
      status: created.getDataValue('status') as 'active' | 'inactive',
      created_at: created.getDataValue('created_at'),
      updated_at: created.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<AssetCategory[]> {
    const categories = await AssetCategoryModel.findAll();
    return categories.map(category => ({
      id: category.getDataValue('id'),
      name: category.getDataValue('name'),
      description: category.getDataValue('description'),
      status: category.getDataValue('status') as 'active' | 'inactive',
      created_at: category.getDataValue('created_at'),
      updated_at: category.getDataValue('updated_at'),
    }));
  }

  async delete(id: number): Promise<void> {
    await AssetCategoryModel.destroy({ where: { id } });
  }

  async update(id: number, category: Partial<AssetCategory>): Promise<AssetCategory> {
    await AssetCategoryModel.update(
      {
        ...category,
        updated_at: new Date(),
      },
      { where: { id } }
    );
    const updated = await AssetCategoryModel.findByPk(id);
    if (!updated) {
      throw new Error('Asset category not found');
    }
    return {
      id: updated.getDataValue('id'),
      name: updated.getDataValue('name'),
      description: updated.getDataValue('description'),
      status: updated.getDataValue('status') as 'active' | 'inactive',
      created_at: updated.getDataValue('created_at'),
      updated_at: updated.getDataValue('updated_at'),
    };
  }
}