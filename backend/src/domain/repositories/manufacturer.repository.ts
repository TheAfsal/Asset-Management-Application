import { Manufacturer } from "../entities/manufacturer.entity";

export interface ManufacturerRepository {
  create(manufacturer: Manufacturer): Promise<Manufacturer>;
  findAll(): Promise<Manufacturer[]>;
  update(id: number, manufacturer: Partial<Manufacturer>): Promise<Manufacturer>;
  delete(id: number): Promise<void>;
}
