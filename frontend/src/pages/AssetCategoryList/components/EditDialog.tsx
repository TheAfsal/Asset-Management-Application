import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import type { AssetCategory } from "../../../types";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  category: AssetCategory | null;
  onUpdate: (id: string, data: Partial<AssetCategory>) => Promise<void>;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  category,
  onUpdate,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description || "",
        status: category.status,
      });
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!form.name.trim() || !category) {
      enqueueSnackbar("Name is required", { variant: "error" });
      return;
    }

    try {
      //@ts-ignore
      await onUpdate(category.id, form);
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      onClose();
    } catch {
      enqueueSnackbar("Failed to update category", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Edit Category
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {
            //@ts-ignore
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
          }
          {
            //@ts-ignore
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>
          }
          {
            //@ts-ignore
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={form.status}
                  label="Status"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
