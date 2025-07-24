import { Manufacturer } from '../entities/manufacturer.entity';
import { ManufacturerRepository } from './manufacturer.repository';
import { ManufacturerModel } from '../../infrastructure/database/models/manufacturer.model';

export class ManufacturerRepositoryImpl implements ManufacturerRepository {
  async create(manufacturer: Manufacturer): Promise<Manufacturer> {
    const created = await ManufacturerModel.create({
      ...manufacturer,
      created_at: manufacturer.created_at || new Date(),
      updated_at: manufacturer.updated_at || new Date(),
    });
    return {
      id: created.getDataValue('id'),
      name: created.getDataValue('name'),
      description: created.getDataValue('description'),
      created_at: created.getDataValue('created_at'),
      updated_at: created.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<Manufacturer[]> {
    const manufacturers = await ManufacturerModel.findAll();
    return manufacturers.map(manufacturer => ({
      id: manufacturer.getDataValue('id'),
      name: manufacturer.getDataValue('name'),
      description: manufacturer.getDataValue('description'),
      created_at: manufacturer.getDataValue('created_at'),
      updated_at: manufacturer.getDataValue('updated_at'),
    }));
  }
}