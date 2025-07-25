import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

const grnValidationRules = [
  body("header.grn_number")
    .notEmpty()
    .withMessage("GRN Number is required")
    .isString()
    .withMessage("GRN Number must be a string")
    .matches(/^GRN-\d{6}-\d{3}$/)
    .withMessage("GRN Number must follow format GRN-YYYYMM-NNN"),
  body("header.grn_date")
    .notEmpty()
    .withMessage("GRN Date is required")
    .isISO8601()
    .withMessage("GRN Date must be a valid date (YYYY-MM-DD)"),
  body("header.invoice_number")
    .notEmpty()
    .withMessage("Invoice Number is required")
    .isString()
    .withMessage("Invoice Number must be a string"),
  body("header.vendor_id")
    .isInt({ min: 1 })
    .withMessage("Vendor ID must be a positive integer"),
  body("header.branch_id")
    .isInt({ min: 1 })
    .withMessage("Branch ID must be a positive integer"),
  body("header.status")
    .isIn(["draft", "submitted"])
    .withMessage('Status must be "draft" or "submitted"'),
  body("lineItems")
    .isArray({ min: 1 })
    .withMessage("At least one line item is required"),
  body("lineItems.*.subcategory_id")
    .isInt({ min: 1 })
    .withMessage("Subcategory ID must be a positive integer"),
  body("lineItems.*.item_description")
    .optional()
    .isString()
    .withMessage("Item description must be a string"),
  body("lineItems.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  body("lineItems.*.unit_price")
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a non-negative number"),
  body("lineItems.*.tax_percent")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax percent must be between 0 and 100"),
  body("lineItems.*.taxable_value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Taxable value must be a non-negative number"),
  body("lineItems.*.total_amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number"),
];

const idValidationRule = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
];

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export { idValidationRule, grnValidationRules, validate };
