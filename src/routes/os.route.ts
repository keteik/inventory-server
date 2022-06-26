import { Router } from 'express';
import OsService from '../services/os.service';

export const osRouter = Router()
    .get('/:id', OsService.getOs);