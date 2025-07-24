import { AssetSubcategory } from '../entities/asset-subcategory.entity';
import { AssetSubcategoryRepository } from './asset-subcategory.repository';
import { AssetSubcategoryModel } from '../../infrastructure/database/models/asset-subcategory.model';

export class AssetSubcategoryRepositoryImpl implements AssetSubcategoryRepository {
  async create(subcategory: AssetSubcategory): Promise<AssetSubcategory> {
    const created = await AssetSubcategoryModel.create({
      ...subcategory,
      created_at: subcategory.created_at || new Date(),
      updated_at: subcategory.updated_at || new Date(),
    });
    return {
      id: created.getDataValue('id'),
      category_id: created.getDataValue('category_id'),
      name: created.getDataValue('name'),
      description: created.getDataValue('description'),
      status: created.getDataValue('status') as 'active' | 'inactive',
      created_at: created.getDataValue('created_at'),
      updated_at: created.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<AssetSubcategory[]> {
    const subcategories = await AssetSubcategoryModel.findAll();
    return subcategories.map(subcategory => ({
      id: subcategory.getDataValue('id'),
      category_id: subcategory.getDataValue('category_id'),
      name: subcategory.getDataValue('name'),
      description: subcategory.getDataValue('description'),
      status: subcategory.getDataValue('status') as 'active' | 'inactive',
      created_at: subcategory.getDataValue('created_at'),
      updated_at: subcategory.getDataValue('updated_at'),
    }));
  }
}