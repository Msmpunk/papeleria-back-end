'use strict';

import { Router } from 'express';
import { signup, signin } from '../controllers/users'
import { getClients, addClient } from '../controllers/clients'
import { getProductsService, getSalesService, saleService } from '../controllers/sales'
import verifyToken from '../middleware/authJwt'

const router = Router();

// LOGIN AND CREATE
router.post('/login', signin);
router.post('/create-new-account', signup);
// CLIENTS
router.get('/get-clients', verifyToken, getClients);
router.post('/add-client', verifyToken, addClient);
// CLIENTS
router.get('/get-products', verifyToken, getProductsService);
router.get('/get-sales', verifyToken, getSalesService);
router.post('/sale', verifyToken, saleService);

export default router;
