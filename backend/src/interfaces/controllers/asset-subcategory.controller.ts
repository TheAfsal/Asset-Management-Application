import { Request, Response } from "express";
import { AssetSubcategoryService } from "../../application/services/asset-subcategory.service";
import { AssetSubcategoryDto } from "../../application/dtos/asset-subcategory.dto";

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
}
