import { Request, Response } from "express";
import { ManufacturerService } from "../../application/services/manufacturer.service";
import { ManufacturerDto } from "../../application/dtos/manufacturer.dto";

export class ManufacturerController {
  constructor(private service: ManufacturerService) {}

  async create(req: Request, res: Response) {
    const dto: ManufacturerDto = req.body;
    const manufacturer = await this.service.create(dto);
    res.status(201).json(manufacturer);
  }

  async findAll(req: Request, res: Response) {
    const manufacturers = await this.service.findAll();
    res.json(manufacturers);
  }
}
