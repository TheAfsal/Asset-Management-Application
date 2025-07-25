import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import type { AssetCategory, AssetSubcategory } from "../../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  subcategory: AssetSubcategory | null;
  onUpdate: (id: number, data: AssetSubcategory) => void;
  categoryList: AssetCategory[];
}

const SubcategoryEditDialog: React.FC<Props> = ({
  open,
  onClose,
  subcategory,
  onUpdate,
  categoryList,
}) => {
  const [form, setForm] = useState<AssetSubcategory | null>(subcategory);

  useEffect(() => {
    setForm(subcategory);
  }, [subcategory]);

  const handleSubmit = () => {
    if (!form || !form.name || !form.category_id) return;
    onUpdate(form.id, form);
  };

  if (!form) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Subcategory</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField
          label="Name"
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          select
          label="Category"
          fullWidth
          value={form.category_id}
          onChange={(e) =>
            setForm({ ...form, category_id: parseInt(e.target.value) })
          }
        >
          <MenuItem value={0}>Select Category</MenuItem>
          {categoryList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          select
          label="Status"
          fullWidth
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as "active" | "inactive" })
          }
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubcategoryEditDialog;
