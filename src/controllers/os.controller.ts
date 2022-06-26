import { Request, Response } from "express";
import mongoose from "mongoose";
import { IOs } from "../models/os.model";
import OsService from "../services/os.service";

class OsController {
    /*async createOs(req: Request, res: Response): Promise<Response> {
        const osBody: IOs = req.body;
        const findUser: IOs = await OsService.getOs()

    }*/

    async getOs(req: Request, res: Response): Promise<Response> {
        const osId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
        try {
            const os = await OsService.getOs(osId);

            if(!os)
                return res.status(404).send({ status: "failed", message: "Os not found!"});
            
            return res.status(200).send({ status: "success", os: os});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }
}

export default new OsController();