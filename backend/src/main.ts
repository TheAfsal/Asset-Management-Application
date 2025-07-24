import express from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import path from "path";
import fs from "fs";
import cors from "cors";
import grnRoutes from "./infrastructure/routes/grn.routes";
import vendorRoutes from "./infrastructure/routes/vendor.routes";
import branchRoutes from "./infrastructure/routes/branch.routes";
import assetCategoryRoutes from "./infrastructure/routes/asset-category.routes";
import assetSubcategoryRoutes from "./infrastructure/routes/asset-subcategory.routes";
import manufacturerRoutes from "./infrastructure/routes/manufacturer.routes";
import errorMiddleware from "./infrastructure/middleware/error.middleware";
import { sequelize } from "./infrastructure/database/sequelize.config";

const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials:true
  })
);

const swaggerPath = path.join(__dirname, "../swagger/swagger.yaml");
const fileContents = fs.readFileSync(swaggerPath, "utf8");
const swaggerDocument = yaml.load(fileContents);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument as Record<string, any>)
);

app.use("/api/v1/grns", grnRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/asset-categories", assetCategoryRoutes);
app.use("/api/v1/asset-subcategories", assetSubcategoryRoutes);
app.use("/api/v1/manufacturers", manufacturerRoutes);

app.use(errorMiddleware);

sequelize.sync().then(() => console.log("Database synced"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
