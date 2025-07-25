import { AssetCategoryRepository } from '../../domain/repositories/asset-category.repository';
import { AssetCategoryDto } from '../dtos/asset-category.dto';
import { AssetCategory } from '../../domain/entities/asset-category.entity';

export class AssetCategoryService {
  constructor(private repository: AssetCategoryRepository) {}

  async create(dto: AssetCategoryDto): Promise<AssetCategory> {
    const category: AssetCategory = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };
    return this.repository.create(category);
  }

  async findAll(): Promise<AssetCategory[]> {
    return this.repository.findAll();
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async update(id: number, category: Partial<AssetCategory>): Promise<AssetCategory> {
    return this.repository.update(id, category);
  }
}