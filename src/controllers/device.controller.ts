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
            const updated = await DeviceService.updateDevice(hardwareUuid, deviceBody);
            console.log(updated);
            return res.status(200).send({ status: "success", message: "Device updated successfully!"});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async deleteDevice(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;

        try {
            const deleted = await DeviceService.deleteDevice(hardwareUuid);
            console.log(deleted);
            return res.status(200).send({ status: "success", message: "Device deleted successfully!"});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async getDeviceOs(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;

        try {
            const findDeviceOs = await DeviceService.getDeviceOs(hardwareUuid);

            if(!findDeviceOs)
                return res.status(404).send({ status: "failed", message: "DeviceOs not found!"});
            
            return res.status(200).send({ status: "success", deviceOs: findDeviceOs});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async getDeviceCpu(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;

        try {
            const findDeviceCpu = await DeviceService.getDeviceCpu(hardwareUuid);

            if(!findDeviceCpu)
                return res.status(404).send({ status: "failed", message: "DeviceCpu not found!"});
            
            return res.status(200).send({ status: "success", deviceCpu: findDeviceCpu});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }

    async getDeviceNetwork(req: Request, res: Response): Promise<Response> {
        const hardwareUuid: string = req.params.id;

        try {
            const findDeviceNetwork = await DeviceService.getDeviceNetwork(hardwareUuid);

            if(!findDeviceNetwork)
                return res.status(404).send({ status: "failed", message: "DeviceCpu not found!"});
            
            return res.status(200).send({ status: "success", deviceNetwork: findDeviceNetwork});
        } catch(err: any) {
            return res.status(404).send({ status: "failed", message: err.message });
        }
    }
}

export default new OsController();