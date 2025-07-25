import { AssetCategory } from "../entities/asset-category.entity";

export interface AssetCategoryRepository {
  create(category: AssetCategory): Promise<AssetCategory>;
  findAll(): Promise<AssetCategory[]>;
  delete(id: number): Promise<void>;
  update(id: number, category: Partial<AssetCategory>): Promise<AssetCategory>;
}
