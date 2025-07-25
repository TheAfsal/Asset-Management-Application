import { Request, Response } from "express";
import {
  GrnHeaderModel,
  GrnLineItemModel,
} from "../../infrastructure/database/models/grn.model";
import { Op } from "sequelize";
import { Router } from "express";
const router = Router();

interface GrnResponse {
  header: any;
  lineItems: any[];
  total_amount: number;
}


export const getGrnReport = async (req: Request, res: Response) => {
  try {
    // Fetch all GRN headers with their line items
    const grnHeaders = await GrnHeaderModel.findAll({
      where: {
        id: { [Op.ne]: null },
      },
      include: [
        {
          model: GrnLineItemModel,
          as: "lineItems",
          attributes: [
            "id",
            "grn_id",
            "subcategory_id",
            "item_description",
            "quantity",
            "unit_price",
            "tax_percent",
            "taxable_value",
            "total_amount",
            "created_at",
            "updated_at",
          ],
        },
      ],
      attributes: [
        "id",
        "grn_number",
        "grn_date",
        "invoice_number",
        "vendor_id",
        "branch_id",
        "status",
        "created_at",
        "updated_at",
      ],
    });

    // Map to GrnResponse[] format with calculated total_amount
    const grns = grnHeaders
      .filter(
        (header: any) => header.id !== null && typeof header.id === "number"
      )
      .map((header: any) => {
        const lineItems: any[] = (header.get("lineItems") as any[]) || [];
        const total_amount = lineItems.reduce(
          (sum: number, item) => sum + (Number(item.get("total_amount")) || 0),
          0
        );

        return {
          header: {
            id: header.id,
            grn_number: header.get("grn_number"),
            grn_date: header.get("grn_date"),
            invoice_number: header.get("invoice_number"),
            vendor_id: header.get("vendor_id"),
            branch_id: header.get("branch_id"),
            status: header.get("status"),
            created_at: header.get("created_at"),
            updated_at: header.get("updated_at"),
          },
          lineItems: lineItems.map((item) => ({
            id: item.id,
            grn_id: item.grn_id,
            subcategory_id: item.subcategory_id,
            item_description: item.get("item_description"),
            quantity: item.quantity,
            unit_price: Number(item.get("unit_price")),
            tax_percent: Number(item.get("tax_percent")),
            taxable_value: item.get("taxable_value"),
            total_amount: Number(item.get("total_amount")),
            created_at: item.get("created_at"),
            updated_at: item.get("updated_at"),
          })),
          total_amount,
        };
      });

    if (grns.length === 0) {
      return res.status(404).json({ message: "No valid GRNs found" });
    }

    res.json(grns);
  } catch (error) {
    console.error("Error fetching GRN report:", error);
    res.status(500).json({ message: "Failed to fetch GRN report" });
  }
};

router.get("/", getGrnReport);
export default router;
