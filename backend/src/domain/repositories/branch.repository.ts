import { Branch } from '../entities/branch.entity';

export interface BranchRepository {
  create(branch: Branch): Promise<Branch>;
  findAll(): Promise<Branch[]>;
}