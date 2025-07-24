import { Request, Response } from "express";
import { GrnService } from "../../application/services/grn.service";
import { CreateGrnDto, UpdateGrnDto } from "../../application/dtos/grn.dto";

export class GrnController {
  constructor(private grnService: GrnService) {}

  async create(req: Request, res: Response) {
    const dto: CreateGrnDto = req.body;
    const grn = await this.grnService.createGrn(dto);
    res.status(201).json(grn);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const dto: UpdateGrnDto = req.body;
    const grn = await this.grnService.updateGrn(id, dto);
    res.json(grn);
  }

  async findAll(req: Request, res: Response) {
    const grns = await this.grnService.findAll();
    res.json(grns);
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const grn = await this.grnService.findById(id);
    if (!grn) return res.status(404).json({ message: "GRN not found" });
    res.json(grn);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await this.grnService.deleteGrn(id);
    res.status(204).send();
  }
}
