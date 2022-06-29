import { Request, Response } from "express";
import mongoose from "mongoose";
import { IDevice, IOs, ICpu, INetwork } from "../models/device.model";
import DeviceService from "../services/device.service";

class OsController {
    async createDevice(req: Request, res: Response): Promise<Response> {
        const deviceBody: IDevice = req.body;
        const findDevice: IDevice | null = await DeviceService.getDevice(deviceBody.hardwareUuid);

        if(findDevice)
            return res.status(409).send({ status: "failed", message: "Device already exists!" });
        try {
            await DeviceService.saveDevice(deviceBody);

            return res.status(200).send({ status: "success", message: "Device added successfully!" });
        } catch(err: any) {
            return res.status(500).send({ status: "failed", message: err.message });
        }
    }

    async getDevice(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;

        try {
            const findDevice = await DeviceService.getDevice(hardwareUuid);

            if(!findDevice)
                return res.status(404).send({ status: "failed", message: "Device not found!"});
            
            return res.status(200).send({ status: "success", device: findDevice});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async getDevices(req: Request, res: Response): Promise<Response> {
        try {
            const findDevice: IDevice [] | null = await DeviceService.getDevices();

            if(!findDevice || findDevice.length === 0)
                return res.status(404).send({ status: "failed", message: "Devices not found!"});
            
            return res.status(200).send({ status: "success", devices: findDevice});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async updateDevice(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;
        const deviceBody: IDevice = req.body;

        try {
            await DeviceService.updateDevice(hardwareUuid, deviceBody);

            return res.status(200).send({ status: "success", message: "Device updated successfully!"});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }
}

export default new OsController();