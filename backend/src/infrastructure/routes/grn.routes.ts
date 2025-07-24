import { Router } from 'express';
import { GrnController } from '../../interfaces/controllers/grn.controller';
import { GrnService } from '../../application/services/grn.service';
import { GrnRepositoryImpl } from '../../domain/repositories/grn.repository.impl';

const router = Router();
const grnService = new GrnService(new GrnRepositoryImpl());
const controller = new GrnController(grnService);

router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;