import { Router } from "express";
import { AssetSubcategoryController } from "../../interfaces/controllers/asset-subcategory.controller";
import { AssetSubcategoryService } from "../../application/services/asset-subcategory.service";
import { AssetSubcategoryRepositoryImpl } from "../../domain/repositories/asset-subcategory.repository.impl";

const router = Router();
const service = new AssetSubcategoryService(
  new AssetSubcategoryRepositoryImpl()
);
const controller = new AssetSubcategoryController(service);

router.post("/", controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
