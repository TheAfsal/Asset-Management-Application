import { Request, Response } from "express";
import { AssetCategoryService } from "../../application/services/asset-category.service";
import { AssetCategoryDto } from "../../application/dtos/asset-category.dto";
import { AssetCategory } from "../../domain/entities/asset-category.entity";

export class AssetCategoryController {
  constructor(private service: AssetCategoryService) {}

  async create(req: Request, res: Response) {
    const dto: AssetCategoryDto = req.body;
    const category = await this.service.create(dto);
    res.status(201).json(category);
  }

  async findAll(req: Request, res: Response) {
    const categories = await this.service.findAll();
    res.json(categories);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    try {
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting asset category', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    const category: Partial<AssetCategory> = req.body;
    try {
      const updatedCategory = await this.service.update(id, category);
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error updating asset category', error });
    }
  }
}
