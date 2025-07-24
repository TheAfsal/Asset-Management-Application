import { Vendor } from "../entities/vendor.entity";

export interface VendorRepository {
  create(vendor: Vendor): Promise<Vendor>;
  findAll(): Promise<Vendor[]>;
}
