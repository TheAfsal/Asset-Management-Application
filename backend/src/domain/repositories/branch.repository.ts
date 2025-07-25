import { Branch } from '../entities/branch.entity';

export interface BranchRepository {
  create(branch: Branch): Promise<Branch>;
  findAll(): Promise<Branch[]>;
  update(id: number, branch: Partial<Branch>): Promise<Branch>;
  delete(id: number): Promise<void>;
}