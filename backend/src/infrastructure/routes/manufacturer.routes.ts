import { Router } from 'express';
import { ManufacturerController } from '../../interfaces/controllers/manufacturer.controller';
import { ManufacturerService } from '../../application/services/manufacturer.service';
import { ManufacturerRepositoryImpl } from '../../domain/repositories/manufacturer.repository.impl';

const router = Router();
const service = new ManufacturerService(new ManufacturerRepositoryImpl());
const controller = new ManufacturerController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
