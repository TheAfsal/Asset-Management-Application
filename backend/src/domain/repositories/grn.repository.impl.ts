import { GrnHeader, GrnLineItem } from '../entities/grn.entity';
import { CreateGrnDto, UpdateGrnDto } from '../../application/dtos/grn.dto';
import { GrnHeaderModel, GrnLineItemModel } from '../../infrastructure/database/models/grn.model';
import { GrnRepository } from './grn.repository';

export class GrnRepositoryImpl implements GrnRepository {
  async createGrn(header: GrnHeader, lineItems: GrnLineItem[]): Promise<GrnHeader> {
    const createdHeader = await GrnHeaderModel.create({
      ...header,
      created_at: header.created_at || new Date(),
      updated_at: header.updated_at || new Date(),
    });
    const lineItemsWithGrnId = lineItems.map(item => ({
      ...item,
      grn_id: createdHeader.getDataValue('id'),
      created_at: item.created_at || new Date(),
      updated_at: item.updated_at || new Date(),
    }));
    await GrnLineItemModel.bulkCreate(lineItemsWithGrnId);
    return {
      id: createdHeader.getDataValue('id'),
      grn_number: createdHeader.getDataValue('grn_number'),
      grn_date: createdHeader.getDataValue('grn_date'),
      invoice_number: createdHeader.getDataValue('invoice_number'),
      vendor_id: createdHeader.getDataValue('vendor_id'),
      branch_id: createdHeader.getDataValue('branch_id'),
      status: createdHeader.getDataValue('status') as 'draft' | 'submitted',
      created_at: createdHeader.getDataValue('created_at'),
      updated_at: createdHeader.getDataValue('updated_at'),
    };
  }

  async updateGrn(id: number, dto: UpdateGrnDto): Promise<GrnHeader> {
    await GrnHeaderModel.update(dto.header, { where: { id } });
    await GrnLineItemModel.destroy({ where: { grn_id: id } });
    const lineItemsWithGrnId = dto.lineItems.map(item => ({
      ...item,
      grn_id: id,
      //@ts-ignore
      created_at: item.created_at || new Date(),
      //@ts-ignore
      updated_at: item.updated_at || new Date(),
    }));
    await GrnLineItemModel.bulkCreate(lineItemsWithGrnId);
    const updatedHeader = await GrnHeaderModel.findByPk(id);
    if (!updatedHeader) throw new Error('GRN not found');
    return {
      id: updatedHeader.getDataValue('id'),
      grn_number: updatedHeader.getDataValue('grn_number'),
      grn_date: updatedHeader.getDataValue('grn_date'),
      invoice_number: updatedHeader.getDataValue('invoice_number'),
      vendor_id: updatedHeader.getDataValue('vendor_id'),
      branch_id: updatedHeader.getDataValue('branch_id'),
      status: updatedHeader.getDataValue('status') as 'draft' | 'submitted',
      created_at: updatedHeader.getDataValue('created_at'),
      updated_at: updatedHeader.getDataValue('updated_at'),
    };
  }

  async findAll(): Promise<GrnHeader[]> {
    const headers = await GrnHeaderModel.findAll();
    return headers.map(header => ({
      id: header.getDataValue('id'),
      grn_number: header.getDataValue('grn_number'),
      grn_date: header.getDataValue('grn_date'),
      invoice_number: header.getDataValue('invoice_number'),
      vendor_id: header.getDataValue('vendor_id'),
      branch_id: header.getDataValue('branch_id'),
      status: header.getDataValue('status') as 'draft' | 'submitted',
      created_at: header.getDataValue('created_at'),
      updated_at: header.getDataValue('updated_at'),
    }));
  }

  // async findAll(): Promise<({ header: GrnHeader; lineItems: GrnLineItem[] })[]> {
  //   const headers = await GrnHeaderModel.findAll({
  //     include: [
  //       {
  //         model: GrnLineItemModel,
  //         as: 'lineItems',
  //       },
  //     ],
  //   });

  //   return headers.map((header: any) => ({
  //     header: {
  //       id: header.getDataValue('id'),
  //       grn_number: header.getDataValue('grn_number'),
  //       grn_date: header.getDataValue('grn_date'),
  //       invoice_number: header.getDataValue('invoice_number'),
  //       vendor_id: header.getDataValue('vendor_id'),
  //       branch_id: header.getDataValue('branch_id'),
  //       status: header.getDataValue('status') as 'draft' | 'submitted',
  //       created_at: header.getDataValue('created_at'),
  //       updated_at: header.getDataValue('updated_at'),
  //     },
  //     lineItems: header.get('lineItems')?.map((item: any) => ({
  //       id: item.getDataValue('id'),
  //       grn_id: item.getDataValue('grn_id'),
  //       subcategory_id: item.getDataValue('subcategory_id'),
  //       item_description: item.getDataValue('item_description') || '',
  //       quantity: item.getDataValue('quantity'),
  //       unit_price: item.getDataValue('unit_price'),
  //       tax_percent: item.getDataValue('tax_percent'),
  //       taxable_value: item.getDataValue('taxable_value'),
  //       total_amount: item.getDataValue('total_amount'),
  //       created_at: item.getDataValue('created_at'),
  //       updated_at: item.getDataValue('updated_at'),
  //     })) || [],
  //   }));
  // }

  // async findById(id: number): Promise<GrnHeader | null> {
  //   const header = await GrnHeaderModel.findByPk(id);
  //   if (!header) return null;
  //   return {
  //     id: header.getDataValue('id'),
  //     grn_number: header.getDataValue('grn_number'),
  //     grn_date: header.getDataValue('grn_date'),
  //     invoice_number: header.getDataValue('invoice_number'),
  //     vendor_id: header.getDataValue('vendor_id'),
  //     branch_id: header.getDataValue('branch_id'),
  //     status: header.getDataValue('status') as 'draft' | 'submitted',
  //     created_at: header.getDataValue('created_at'),
  //     updated_at: header.getDataValue('updated_at'),
  //   };
  // }

  async findById(id: number): Promise<{ header: GrnHeader; lineItems: GrnLineItem[] } | null> {
    const header = await GrnHeaderModel.findByPk(id, {
      include: [
        {
          model: GrnLineItemModel,
          as: 'lineItems', // Ensure the association is defined with this alias
        },
      ],
    });
    if (!header) return null;

    return {
      header: {
        id: header.getDataValue('id'),
        grn_number: header.getDataValue('grn_number'),
        grn_date: header.getDataValue('grn_date'),
        invoice_number: header.getDataValue('invoice_number'),
        vendor_id: header.getDataValue('vendor_id'),
        branch_id: header.getDataValue('branch_id'),
        status: header.getDataValue('status') as 'draft' | 'submitted',
        created_at: header.getDataValue('created_at'),
        updated_at: header.getDataValue('updated_at'),
      },
      //@ts-ignore
      lineItems: header.get('lineItems')?.map((item: any) => ({
        id: item.getDataValue('id'),
        grn_id: item.getDataValue('grn_id'),
        subcategory_id: item.getDataValue('subcategory_id'),
        item_description: item.getDataValue('item_description') || '',
        quantity: item.getDataValue('quantity'),
        unit_price: item.getDataValue('unit_price'),
        tax_percent: item.getDataValue('tax_percent'),
        taxable_value: item.getDataValue('taxable_value'),
        total_amount: item.getDataValue('total_amount'),
        created_at: item.getDataValue('created_at'),
        updated_at: item.getDataValue('updated_at'),
      })) || [],
    };
  }

  async deleteGrn(id: number): Promise<void> {
    await GrnLineItemModel.destroy({ where: { grn_id: id } });
    await GrnHeaderModel.destroy({ where: { id } });
  }
}


