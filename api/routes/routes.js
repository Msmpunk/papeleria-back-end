'use strict';

import { Router } from 'express';
import { getBooks } from '../controllers/finder'
import { signup, signin } from '../controllers/users'

const router = Router();

// LOGIN AND CREATE
router.post('/login', signin);
router.post('/create-new-account', signup);

router.get('/finder', getBooks);

export default router;
