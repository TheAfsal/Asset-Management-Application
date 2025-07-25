export interface GrnHeader {
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

export interface Grn {
  header: GrnHeader;
  lineItems: GrnLineItem[];
  total_amount: number;
}


export interface AssetSummary {
  category_name: string;
  branch_name: string;
  asset_count: number;
}

export interface GrnLineItem {
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

export interface GrnFormData {
  header: {
    grn_number: string;
    grn_date: string;
    invoice_number: string;
    vendor_id: number;
    branch_id: number;
    status: "draft" | "submitted";
  };
  lineItems: {
    subcategory_id: number;
    item_description: string;
    quantity: number;
    unit_price: number;
    tax_percent: number;
    taxable_value: number;
    total_amount: number;
  }[];
}

export interface Vendor {
  id: number;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  gst_number?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Branch {
  id: number;
  name: string;
  location?: string;
  code: string;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}

export interface AssetCategory {
  id: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}

export interface AssetSubcategory {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}

export interface Manufacturer {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}
