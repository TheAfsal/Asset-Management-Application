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
import type { Branch } from "../../../types";

interface BranchTableProps {
  branches: Branch[];
  onEdit: (branch: Branch) => void;
  onDelete: (id: number) => void;
}

const BranchTable: React.FC<BranchTableProps> = ({
  branches,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2" align="center">
                  No branches found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.location}</TableCell>
                <TableCell>{branch.code}</TableCell>
                <TableCell>{branch.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(branch)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(branch.id)}
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

export default BranchTable;
