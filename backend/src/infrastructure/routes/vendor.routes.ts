import { Router } from "express";
import { VendorController } from "../../interfaces/controllers/vendor.controller";
import { VendorService } from "../../application/services/vendor.service";
import { VendorRepositoryImpl } from "../../domain/repositories/vendor.repository.impl";

const router = Router();
const vendorService = new VendorService(new VendorRepositoryImpl());
const controller = new VendorController(vendorService);

router.post("/", controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));

export default router;
