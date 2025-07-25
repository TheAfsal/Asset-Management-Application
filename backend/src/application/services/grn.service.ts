import { GrnRepository } from '../../domain/repositories/grn.repository';
import { CreateGrnDto, UpdateGrnDto } from '../dtos/grn.dto';
import { GrnHeader, GrnLineItem } from '../../domain/entities/grn.entity';

export class GrnService {
  constructor(private grnRepository: GrnRepository) {}

  async createGrn(dto: CreateGrnDto): Promise<GrnHeader> {
    const header: GrnHeader = {
      ...dto.header,
      grn_number: `GRN-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.floor(100 + Math.random() * 900)}`,
      grn_date: new Date(dto.header.grn_date),
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };

    const lineItems: GrnLineItem[] = dto.lineItems.map(item => ({
      ...item,
      taxable_value: item.quantity * item.unit_price,
      total_amount: item.quantity * item.unit_price * (1 + item.tax_percent / 100),
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
      grn_id: 0,
    }));

    return this.grnRepository.createGrn(header, lineItems);
  }

  async updateGrn(id: number, dto: UpdateGrnDto): Promise<GrnHeader> {
    return this.grnRepository.updateGrn(id, dto);
  }

  async findAll(): Promise<GrnHeader[]> {
    return this.grnRepository.findAll();
  }

  async findById(id: number): Promise<{ header: GrnHeader; lineItems: GrnLineItem[] } | null> {
    return this.grnRepository.findById(id);
  }

  async deleteGrn(id: number): Promise<void> {
    return this.grnRepository.deleteGrn(id);
  }
}


  