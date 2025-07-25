import { Request, Response } from "express";
import { ManufacturerService } from "../../application/services/manufacturer.service";
import { ManufacturerDto } from "../../application/dtos/manufacturer.dto";
import { Manufacturer } from "../../domain/entities/manufacturer.entity";

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

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    const manufacturer: Partial<Manufacturer> = req.body;
    try {
      const updatedManufacturer = await this.service.update(id, manufacturer);
      res.status(200).json(updatedManufacturer);
    } catch (error) {
      res.status(500).json({ message: 'Error updating manufacturer', error });
    }
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
      res.status(500).json({ message: 'Error deleting manufacturer', error });
    }
  }
}
