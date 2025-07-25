import { VendorRepository } from "../../domain/repositories/vendor.repository";
import { VendorDto } from "../dtos/vendor.dto";
import { Vendor } from "../../domain/entities/vendor.entity";

export class VendorService {
  constructor(private vendorRepository: VendorRepository) {}

  async createVendor(dto: VendorDto): Promise<Vendor> {
    const vendor: Vendor = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };
    return this.vendorRepository.create(vendor);
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorRepository.findAll();
  }

  async update(id: number, vendor: Partial<Vendor>): Promise<Vendor> {
    return this.vendorRepository.update(id, vendor);
  }

  async delete(id: number): Promise<void> {
    return this.vendorRepository.delete(id);
  }
}
