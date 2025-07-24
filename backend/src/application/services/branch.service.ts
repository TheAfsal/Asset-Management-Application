import { BranchRepository } from "../../domain/repositories/branch.repository";
import { BranchDto } from "../dtos/branch.dto";
import { Branch } from "../../domain/entities/branch.entity";

export class BranchService {
  constructor(private branchRepository: BranchRepository) {}

  async createBranch(dto: BranchDto): Promise<Branch> {
    const branch: Branch = {
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
    };
    return this.branchRepository.create(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }
}
