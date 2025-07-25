import { Request, Response } from "express";
import { GrnService } from "../../application/services/grn.service";
import { CreateGrnDto, UpdateGrnDto } from "../../application/dtos/grn.dto";
import { ValidationError } from "express-validator";
import { Sequelize } from "sequelize";

export class GrnController {
  constructor(private grnService: GrnService) {}

  async create(req: Request, res: Response) {
    try {
      const dto: CreateGrnDto = req.body;
      const grn = await this.grnService.createGrn(dto);
      res.status(201).json(grn);
    } catch (error) {
      this.handleError(error, res, "Failed to create GRN");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const dto: UpdateGrnDto = req.body;
      const grn = await this.grnService.updateGrn(id, dto);
      res.json(grn);
    } catch (error) {
      this.handleError(error, res, "Failed to update GRN");
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const grns = await this.grnService.findAll();
      res.json(grns);
    } catch (error) {
      this.handleError(error, res, "Failed to fetch GRNs");
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const grn = await this.grnService.findById(id);
      if (!grn) return res.status(404).json({ message: "GRN not found" });
      res.json({
        header: {
          id: grn.header.id,
          grn_number: grn.header.grn_number,
          grn_date: grn.header.grn_date.toISOString().split("T")[0],
          invoice_number: grn.header.invoice_number,
          vendor_id: grn.header.vendor_id,
          branch_id: grn.header.branch_id,
          status: grn.header.status,
        },
        lineItems: grn.lineItems.map((item) => ({
          id: item.id,
          subcategory_id: item.subcategory_id,
          item_description: item.item_description || "",
          quantity: item.quantity,
          unit_price: item.unit_price,
          tax_percent: item.tax_percent,
          taxable_value: item.taxable_value,
          total_amount: item.total_amount,
        })),
      });
    } catch (error) {
      this.handleError(error, res, "Failed to fetch GRN");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.grnService.deleteGrn(id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res, "Failed to delete GRN");
    }
  }

  private handleError(error: any, res: Response, defaultMessage: string) {
    res
      .status(500)
      .json({
        message: defaultMessage,
        errors: [{ message: error.message || "Unknown error" }],
      });
  }
}
