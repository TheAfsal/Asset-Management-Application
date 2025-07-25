import { Router } from 'express';
import { GrnController } from '../../interfaces/controllers/grn.controller';
import { GrnService } from '../../application/services/grn.service';
import { GrnRepositoryImpl } from '../../domain/repositories/grn.repository.impl';
import { Request, Response, NextFunction } from 'express';
import { grnValidationRules, idValidationRule, validate } from '../validations/grnValidationRules';

const router = Router();
const grnService = new GrnService(new GrnRepositoryImpl());
const controller = new GrnController(grnService);

router.post('/', grnValidationRules, validate, controller.create.bind(controller));
router.put('/:id', [...idValidationRule, ...grnValidationRules], validate, controller.update.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.get('/:id', idValidationRule, validate, controller.findById.bind(controller));
router.delete('/:id', idValidationRule, validate, controller.delete.bind(controller));

export default router;