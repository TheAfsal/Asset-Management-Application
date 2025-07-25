import { AssetSubcategory } from "../entities/asset-subcategory.entity";

export interface AssetSubcategoryRepository {
  create(subcategory: AssetSubcategory): Promise<AssetSubcategory>;
  findAll(): Promise<AssetSubcategory[]>;
  update(id: number, subcategory: Partial<AssetSubcategory>): Promise<AssetSubcategory>;
  delete(id: number): Promise<void>;
}
