import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import { verifyToken } from '../middleware/auth';

export const deviceRouter = Router()
    .get('/', verifyToken, DeviceController.getDevices)
    .get('/:id', verifyToken, DeviceController.getDevice)
    .get('/os/:id', verifyToken, DeviceController.getDeviceOs)
    .get('/cpu/:id', verifyToken, DeviceController.getDeviceCpu)
    .get('/network/:id', verifyToken, DeviceController.getDeviceNetwork)
    .post('/', DeviceController.createDevice)
    .put('/:id', DeviceController.updateDevice)
    .delete('/:id', verifyToken, DeviceController.deleteDevice);