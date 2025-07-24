import { AssetSubcategoryRepository } from "../../domain/repositories/asset-subcategory.repository";
import { AssetSubcategoryDto } from "../dtos/asset-subcategory.dto";
import { AssetSubcategory } from "../../domain/entities/asset-subcategory.entity";

export class AssetSubcategoryService {
  constructor(private repository: AssetSubcategoryRepository) {}

  async create(dto: AssetSubcategoryDto): Promise<AssetSubcategory> {
    const subcategory: AssetSubcategory = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };
    return this.repository.create(subcategory);
  }

  async findAll(): Promise<AssetSubcategory[]> {
    return this.repository.findAll();
  }
}
