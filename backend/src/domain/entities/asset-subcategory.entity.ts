export class AssetSubcategory {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}
