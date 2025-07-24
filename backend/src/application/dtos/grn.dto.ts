export interface GrnHeaderDto {
    grn_number: string;
    grn_date: string;
    invoice_number: string;
    vendor_id: number;
    branch_id: number;
    status: 'draft' | 'submitted';
  }
  
  export interface GrnLineItemDto {
    subcategory_id: number;
    item_description: string;
    quantity: number;
    unit_price: number;
    tax_percent: number;
    taxable_value: number;
    total_amount: number;
  }
  
  export interface CreateGrnDto {
    header: GrnHeaderDto;
    lineItems: GrnLineItemDto[];
  }
  
  export interface UpdateGrnDto {
    header: Partial<GrnHeaderDto>;
    lineItems: GrnLineItemDto[];
  }