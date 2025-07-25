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
import type { Manufacturer } from "../../../types";

interface Props {
  manufacturers: Manufacturer[];
  onEdit: (item: Manufacturer) => void;
  onDelete: (id: number) => void;
}

const ManufacturerTable: React.FC<Props> = ({
  manufacturers,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {manufacturers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="body2" align="center">
                  No manufacturers found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            manufacturers.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(m)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(m.id)}
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

export default ManufacturerTable;
