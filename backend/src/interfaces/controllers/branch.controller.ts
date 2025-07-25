import { Request, Response } from "express";
import { BranchService } from "../../application/services/branch.service";
import { BranchDto } from "../../application/dtos/branch.dto";
import { Branch } from "../../domain/entities/branch.entity";

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

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    const branch: Partial<Branch> = req.body;
    try {
      const updatedBranch = await this.branchService.update(id, branch);
      res.status(200).json(updatedBranch);
    } catch (error) {
      res.status(500).json({ message: 'Error updating branch', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }
    try {
      await this.branchService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting branch', error });
    }
  }
}
