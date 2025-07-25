import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { AssetCategory, AssetSubcategory } from "../../../types";

interface Props {
  subcategories: AssetSubcategory[];
  categories: AssetCategory[];
  onEdit: (subcategory: AssetSubcategory) => void;
  onDelete: (id: number) => void;
}

const SubcategoryTable: React.FC<Props> = ({
  subcategories,
  categories,
  onEdit,
  onDelete,
}) => {
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.name || "N/A";

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2" align="center">
                  No subcategories found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            subcategories.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{getCategoryName(sub.category_id)}</TableCell>
                <TableCell>{sub.description}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(sub)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(sub.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubcategoryTable;
