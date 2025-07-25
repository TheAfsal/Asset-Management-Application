import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Card,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import ExcelJS from "exceljs";
import AutoCompleteSelect from "../common/AutoCompleteSelect";
import type { AssetSubcategory } from "../../types";

interface LineItemTableProps {
  subcategories: AssetSubcategory[];
}

const LineItemTable: React.FC<LineItemTableProps> = ({ subcategories }) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [rows, setRows] = useState([{ id: Date.now() }]);

  const lineItems =
    useWatch({
      name: "lineItems",
      control,
    }) || [];

  useEffect(() => {
    lineItems.forEach((item: any, index: number) => {
      const quantity = item?.quantity || 0;
      const unit_price = item?.unit_price || 0;
      const tax_percent = item?.tax_percent || 0;

      const taxable_value = Number((quantity * unit_price).toFixed(2));
      const total_amount = Number(
        (taxable_value * (1 + tax_percent / 100)).toFixed(2)
      );

      if (item.taxable_value !== taxable_value) {
        setValue(`lineItems[${index}].taxable_value`, taxable_value);
      }
      if (item.total_amount !== total_amount) {
        setValue(`lineItems[${index}].total_amount`, total_amount);
      }
    });
  }, [lineItems, setValue]);

  const addRow = () => {
    setRows([...rows, { id: Date.now() + Math.random() }]);
  };

  const removeRow = (id: number) => {
    const indexToRemove = rows.findIndex((row) => row.id === id);
    setRows(rows.filter((row) => row.id !== id));
    const updatedItems = lineItems.filter((_, i) => i !== indexToRemove);
    setValue("lineItems", updatedItems);
  };

  const handleExcelUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const rowsData: any[] = [];

    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return;

      const [
        subcategory_id,
        item_description,
        quantity,
        unit_price,
        tax_percent,
      ] = row.values.slice(1); 

      const qty = Number(quantity) || 0;
      const price = Number(unit_price) || 0;
      const tax = Number(tax_percent) || 0;
      const taxable_value = Number((qty * price).toFixed(2));
      const total_amount = Number(
        (taxable_value * (1 + tax / 100)).toFixed(2)
      );

      rowsData.push({
        subcategory_id,
        item_description: item_description || "",
        quantity: qty,
        unit_price: price,
        tax_percent: tax,
        taxable_value,
        total_amount,
      });
    });

    setValue("lineItems", rowsData);
    setRows(rowsData.map(() => ({ id: Date.now() + Math.random() })));
    e.target.value = ""; // Reset file input
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Box className="mb-6 flex justify-between items-center">
        <Typography variant="h6" className="font-semibold text-gray-800">
          Line Items
        </Typography>
        <Box className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addRow}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Add Item
            </Button>
          </motion.div>

          <Button variant="outlined" component="label">
            Upload Excel
            <input
              type="file"
              accept=".xlsx"
              hidden
              onChange={handleExcelUpload}
            />
          </Button>
        </Box>
      </Box>

      <Card className="luxury-card border-0">
        <TableContainer component={Paper} className="border-0">
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                <TableCell>#</TableCell>
                <TableCell>Sub-Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Tax %</TableCell>
                <TableCell>Taxable Value</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    component={TableRow}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <AutoCompleteSelect
                        name={`lineItems[${index}].subcategory_id`}
                        options={subcategories.map((s) => ({
                          value: s.id,
                          label: s.name,
                        }))}
                        error={!!errors.lineItems?.[index]?.subcategory_id}
                        helperText={
                          errors.lineItems?.[index]?.subcategory_id?.message
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].item_description`)}
                        size="small"
                        inputProps={{ maxLength: 100 }}
                        error={!!errors.lineItems?.[index]?.item_description}
                        helperText={
                          errors.lineItems?.[index]?.item_description?.message
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].quantity`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        size="small"
                        error={!!errors.lineItems?.[index]?.quantity}
                        helperText={
                          errors.lineItems?.[index]?.quantity?.message
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].unit_price`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        size="small"
                        error={!!errors.lineItems?.[index]?.unit_price}
                        helperText={
                          errors.lineItems?.[index]?.unit_price?.message
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].tax_percent`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        size="small"
                        error={!!errors.lineItems?.[index]?.tax_percent}
                        helperText={
                          errors.lineItems?.[index]?.tax_percent?.message
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].taxable_value`)}
                        size="small"
                        InputProps={{ readOnly: true }}
                        className="bg-gray-50"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        {...register(`lineItems[${index}].total_amount`)}
                        size="small"
                        InputProps={{ readOnly: true }}
                        className="bg-gray-50"
                      />
                    </TableCell>
                    <TableCell>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          onClick={() => removeRow(row.id)}
                          className="text-red-600 hover:bg-red-50"
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </motion.div>
  );
};

export default LineItemTable;
