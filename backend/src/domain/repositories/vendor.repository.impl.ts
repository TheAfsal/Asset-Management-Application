import { Vendor } from '../entities/vendor.entity';
import { VendorRepository } from './vendor.repository';
import { VendorModel } from '../../infrastructure/database/models/vendor.model';

export class VendorRepositoryImpl implements VendorRepository {
  async create(vendor: Vendor): Promise<Vendor> {
    const created = await VendorModel.create({
      ...vendor,
      created_at: vendor.created_at || new Date(),
      updated_at: vendor.updated_at || new Date(),
    });
    return {
      id: created.getDataValue('id'),
      name: created.getDataValue('name'),
      contact_person: created.getDataValue('contact_person'),
      email: created.getDataValue('email'),
      phone: created.getDataValue('phone'),
      address: created.getDataValue('address'),
      gst_number: created.getDataValue('gst_number'),
      created_at: created.getDataValue('created_at'),
      updated_at: created.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<Vendor[]> {
    const vendors = await VendorModel.findAll();
    return vendors.map(vendor => ({
      id: vendor.getDataValue('id'),
      name: vendor.getDataValue('name'),
      contact_person: vendor.getDataValue('contact_person'),
      email: vendor.getDataValue('email'),
      phone: vendor.getDataValue('phone'),
      address: vendor.getDataValue('address'),
      gst_number: vendor.getDataValue('gst_number'),
      created_at: vendor.getDataValue('created_at'),
      updated_at: vendor.getDataValue('updated_at'),
    }));
  }
}