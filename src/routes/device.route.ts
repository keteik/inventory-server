import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import { verifyToken } from '../middleware/auth';

export const deviceRouter = Router()
    .get('/',verifyToken, DeviceController.getDevices)
    .get('/:id', verifyToken, DeviceController.getDevice)
    .post('/', DeviceController.createDevice)
    .put('/:id', DeviceController.updateDevice);