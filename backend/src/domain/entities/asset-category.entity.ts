export class AssetCategory {
  id: number;
  name: string;
  description?: string;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
}
