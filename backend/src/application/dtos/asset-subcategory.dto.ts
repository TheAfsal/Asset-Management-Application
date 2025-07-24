export interface AssetSubcategoryDto {
  category_id: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
}
