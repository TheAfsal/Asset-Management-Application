import { Router } from 'express';
import { BranchController } from '../../interfaces/controllers/branch.controller';
import { BranchService } from '../../application/services/branch.service';
import { BranchRepositoryImpl } from '../../domain/repositories/branch.repository.impl';

const router = Router();
const branchService = new BranchService(new BranchRepositoryImpl());
const controller = new BranchController(branchService);

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;