import React, { useEffect, useState } from "react";
import { useAssetCategory } from "../../hooks/useAssetCategory";
import CategoryTable from "./components/CategoryTable";
import CreateDialog from "./components/CreateDialog";
import EditDialog from "./components/EditDialog";
import DeleteDialog from "./components/DeleteDialog";
import type { AssetCategory } from "../../types";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

const AssetCategoryList: React.FC = () => {
  const {
    categories,
    fetchAssetCategories,
    createAssetCategory,
    updateAssetCategory,
    deleteAssetCategory,
  } = useAssetCategory();

  const { enqueueSnackbar } = useSnackbar();

  const [editCategory, setEditCategory] = useState<AssetCategory | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<AssetCategory | null>(
    null
  );
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchAssetCategories();
  }, []);

  const handleCreate = async (data: Omit<AssetCategory, "id">) => {
    try {
      await createAssetCategory(data);
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setCreateDialogOpen(false);
    } catch {
      enqueueSnackbar("Failed to create category", { variant: "error" });
    }
  };

  const handleUpdate = async (id: number, data: AssetCategory) => {
    try {
      await updateAssetCategory(id, data);
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      setEditCategory(null);
    } catch {
      enqueueSnackbar("Failed to update category", { variant: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await deleteAssetCategory(id);
      enqueueSnackbar("Category deleted", { variant: "info" });
      setDeleteCategory(null);
    } catch {
      enqueueSnackbar("Failed to delete category", { variant: "error" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asset Categories</h1>
        <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
          Create Category
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={setEditCategory}
        onDelete={setDeleteCategory}
      />

      <CreateDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        //@ts-ignore
        onCreate={handleCreate}
      />

      <EditDialog
        open={Boolean(editCategory)}
        onClose={() => setEditCategory(null)}
        category={editCategory}
        //@ts-ignore
        onUpdate={handleUpdate}
      />

      <DeleteDialog
        open={Boolean(deleteCategory)}
        onClose={() => setDeleteCategory(null)}
        category={deleteCategory}
        //@ts-ignore
        onDelete={() => deleteCategory && handleDelete(deleteCategory.id)}
      />
    </div>
  );
};

export default AssetCategoryList;
