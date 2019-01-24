import * as express from 'express';

import * as dal from './dal';

const router = express.Router();

router.get('/api', dal.getAll);
router.get('/api/:id', dal.getById);

router.get('/:id', dal.renderById);
router.get('/', dal.renderAll);

export { router };