import { AssetCategory } from "../entities/asset-category.entity";

export interface AssetCategoryRepository {
  create(category: AssetCategory): Promise<AssetCategory>;
  findAll(): Promise<AssetCategory[]>;
}
