import { Request, Response } from "express";
import { AssetCategoryService } from "../../application/services/asset-category.service";
import { AssetCategoryDto } from "../../application/dtos/asset-category.dto";

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
}
