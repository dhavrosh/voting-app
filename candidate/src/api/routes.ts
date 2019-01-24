import * as express from 'express';

import * as controller from './controller';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

export { router };