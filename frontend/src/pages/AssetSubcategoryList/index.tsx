import React, { useEffect, useState } from "react";
import { useAssetSubcategory } from "../../hooks/useAssetSubcategory";
import { useAssetCategory } from "../../hooks/useAssetCategory";
import SubcategoryCreateDialog from "./components/SubcategoryCreateDialog";
import SubcategoryEditDialog from "./components/SubcategoryEditDialog";
import SubcategoryTable from "./components/SubcategoryTable";
import type { AssetSubcategory } from "../../types";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const AssetSubcategoryList: React.FC = () => {
  const {
    subcategories,
    fetchAssetSubcategories,
    createAssetSubcategory,
    updateAssetSubcategory,
    deleteAssetSubcategory,
  } = useAssetSubcategory();

  const { categories, fetchAssetCategories } = useAssetCategory();
  const { enqueueSnackbar } = useSnackbar();

  const [editSubcategory, setEditSubcategory] = useState<AssetSubcategory | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchAssetSubcategories();
    fetchAssetCategories();
  }, []);

  const handleCreate = async (data: Omit<AssetSubcategory, "id">) => {
    try {
      await createAssetSubcategory(data);
      enqueueSnackbar("Subcategory created successfully", { variant: "success" });
      setCreateDialogOpen(false);
    } catch {
      enqueueSnackbar("Failed to create subcategory", { variant: "error" });
    }
  };

  const handleUpdate = async (id: number, data: AssetSubcategory) => {
    try {
      await updateAssetSubcategory(id, data);
      enqueueSnackbar("Subcategory updated successfully", { variant: "success" });
      setEditSubcategory(null);
    } catch {
      enqueueSnackbar("Failed to update subcategory", { variant: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      await deleteAssetSubcategory(id);
      enqueueSnackbar("Subcategory deleted", { variant: "info" });
    } catch {
      enqueueSnackbar("Failed to delete subcategory", { variant: "error" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Subcategories</h1>
        <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
          Create Subcategory
        </Button>
      </div>
      <SubcategoryTable
        subcategories={subcategories}
        categories={categories}
        onEdit={setEditSubcategory}
        onDelete={handleDelete}
      />
      <SubcategoryCreateDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={handleCreate}
        categories={categories}
      />
      <SubcategoryEditDialog
        open={Boolean(editSubcategory)}
        onClose={() => setEditSubcategory(null)}
        categoryList={categories}
        subcategory={editSubcategory}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AssetSubcategoryList;
