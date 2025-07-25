import React, { useState } from "react";
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
  onCreate: (data: Omit<AssetSubcategory, "id">) => void;
  categories: AssetCategory[];
}

const SubcategoryCreateDialog: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
  categories,
}) => {
  //@ts-ignore
  const [form, setForm] = useState<Omit<AssetSubcategory, "id">>({
    name: "",
    description: "",
    category_id: 0,
    status: "active",
  });

  const handleSubmit = () => {
    if (!form.name || !form.category_id) return;
    onCreate(form);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Subcategory</DialogTitle>
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
          {categories.map((cat) => (
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
            setForm({
              ...form,
              status: e.target.value as "active" | "inactive",
            })
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

export default SubcategoryCreateDialog;
