import { Vendor } from "../entities/vendor.entity";

export interface VendorRepository {
  create(vendor: Vendor): Promise<Vendor>;
  findAll(): Promise<Vendor[]>;
  update(id: number, vendor: Partial<Vendor>): Promise<Vendor>;
  delete(id: number): Promise<void>;
}
