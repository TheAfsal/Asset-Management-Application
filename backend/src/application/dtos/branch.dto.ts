export interface BranchDto {
  name: string;
  location?: string;
  code: string;
  status: "active" | "inactive";
}
