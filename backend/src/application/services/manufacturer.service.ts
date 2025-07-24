import { ManufacturerRepository } from '../../domain/repositories/manufacturer.repository';
import { ManufacturerDto } from '../dtos/manufacturer.dto';
import { Manufacturer } from '../../domain/entities/manufacturer.entity';

export class ManufacturerService {
  constructor(private repository: ManufacturerRepository) {}

  async create(dto: ManufacturerDto): Promise<Manufacturer> {
    const manufacturer: Manufacturer = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };
    return this.repository.create(manufacturer);
  }

  async findAll(): Promise<Manufacturer[]> {
    return this.repository.findAll();
  }
}