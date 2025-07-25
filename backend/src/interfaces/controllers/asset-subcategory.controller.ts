import { Request, Response } from "express";
import { AssetSubcategoryService } from "../../application/services/asset-subcategory.service";
import { AssetSubcategoryDto } from "../../application/dtos/asset-subcategory.dto";
import { AssetSubcategory } from "../../domain/entities/asset-subcategory.entity";

export class AssetSubcategoryController {
  constructor(private service: AssetSubcategoryService) {}

  async create(req: Request, res: Response) {
    const dto: AssetSubcategoryDto = req.body;
    const subcategory = await this.service.create(dto);
    res.status(201).json(subcategory);
  }

  async findAll(req: Request, res: Response) {
    const subcategories = await this.service.findAll();
    res.json(subcategories);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    const subcategory: Partial<AssetSubcategory> = req.body;
    try {
      const updatedSubcategory = await this.service.update(id, subcategory);
      res.status(200).json(updatedSubcategory);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating asset subcategory", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    try {
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting asset subcategory", error });
    }
  }
}
