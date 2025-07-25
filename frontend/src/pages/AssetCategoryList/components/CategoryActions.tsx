import React from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import type { AssetCategory } from "../../../types";

interface CategoryActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: AssetCategory[];
  onOpenCreate: () => void;
  refreshCategories: () => void;
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenCreate,
  refreshCategories,
}) => {
  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        {
          //@ts-ignore
          <Grid item xs={12} md={6}>
            <TextField
              label="Search by name or description"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        }
        {
          //@ts-ignore
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="flex-end"
            spacing={2}
          >
            {
              //@ts-ignore
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={refreshCategories}
                >
                  Refresh
                </Button>
              </Grid>
            }
            {
              //@ts-ignore
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={onOpenCreate}
                >
                  Add Category
                </Button>
              </Grid>
            }
          </Grid>
        }
      </Grid>
    </Box>
  );
};

export default CategoryActions;
