export class GrnHeader {
  id: number;
  grn_number: string;
  grn_date: Date;
  invoice_number: string;
  vendor_id: number;
  branch_id: number;
  status: "draft" | "submitted";
  created_at: Date;
  updated_at: Date;
}

export class GrnLineItem {
  id: number;
  grn_id: number;
  subcategory_id: number;
  item_description: string;
  quantity: number;
  unit_price: number;
  tax_percent: number;
  taxable_value: number;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}
