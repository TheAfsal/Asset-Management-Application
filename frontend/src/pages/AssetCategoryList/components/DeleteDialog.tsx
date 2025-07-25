import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import type { AssetCategory } from "../../../types";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  category: AssetCategory | null;
  onDelete: (id: string) => Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  category,
  onDelete,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!category) return;
    try {
      //@ts-ignore
      await onDelete(category.id);
      enqueueSnackbar("Category deleted", { variant: "success" });
      onClose();
    } catch {
      enqueueSnackbar("Failed to delete category", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Are you sure you want to delete <strong>{category?.name}</strong>?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
