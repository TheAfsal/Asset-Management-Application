import { Request, Response } from "express";
import { VendorService } from "../../application/services/vendor.service";
import { VendorDto } from "../../application/dtos/vendor.dto";

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
}
