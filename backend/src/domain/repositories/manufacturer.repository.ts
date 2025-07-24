import { Manufacturer } from "../entities/manufacturer.entity";

export interface ManufacturerRepository {
  create(manufacturer: Manufacturer): Promise<Manufacturer>;
  findAll(): Promise<Manufacturer[]>;
}
