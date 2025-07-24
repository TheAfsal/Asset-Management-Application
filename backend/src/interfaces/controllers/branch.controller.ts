import { Request, Response } from "express";
import { BranchService } from "../../application/services/branch.service";
import { BranchDto } from "../../application/dtos/branch.dto";

export class BranchController {
  constructor(private branchService: BranchService) {}

  async create(req: Request, res: Response) {
    const dto: BranchDto = req.body;
    const branch = await this.branchService.createBranch(dto);
    res.status(201).json(branch);
  }

  async findAll(req: Request, res: Response) {
    const branches = await this.branchService.findAll();
    res.json(branches);
  }
}
