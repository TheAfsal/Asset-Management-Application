import { Request, Response } from "express";
import { VendorService } from "../../application/services/vendor.service";
import { VendorDto } from "../../application/dtos/vendor.dto";
import { Vendor } from "../../domain/entities/vendor.entity";

export class VendorController {
  constructor(private vendorService: VendorService) {}

  async create(req: Request, res: Response) {
    const dto: VendorDto = req.body;
    const vendor = await this.vendorService.createVendor(dto);
    res.status(201).json(vendor);
  }

  async findAll(req: Request, res: Response) {
    const vendors = await this.vendorService.findAll();
    res.json(vendors);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    const vendor: Partial<Vendor> = req.body;
    try {
      const updatedVendor = await this.vendorService.update(id, vendor);
      res.status(200).json(updatedVendor);
    } catch (error) {
      res.status(500).json({ message: 'Error updating vendor', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    try {
      await this.vendorService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting vendor', error });
    }
  }
}
