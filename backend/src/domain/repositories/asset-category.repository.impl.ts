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
}