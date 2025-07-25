import { Router } from 'express';
import { AssetCategoryController } from '../../interfaces/controllers/asset-category.controller';
import { AssetCategoryService } from '../../application/services/asset-category.service';
import { AssetCategoryRepositoryImpl } from '../../domain/repositories/asset-category.repository.impl';

const router = Router();
const service = new AssetCategoryService(new AssetCategoryRepositoryImpl());
const controller = new AssetCategoryController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.delete('/:id', controller.delete.bind(controller));
router.put('/:id', controller.update.bind(controller));

export default router;