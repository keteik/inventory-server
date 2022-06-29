import mongoose, { UpdateQuery } from "mongoose";
import { IDevice, Device } from "../models/device.model";

class DeviceService {
    async getDevice(hardwareUuid: string): Promise<IDevice  | null> {
        return Device.findOne({ hardwareUuid: hardwareUuid } );
    }

    async getDevices(): Promise<IDevice [] | null> {
        return Device.find();
    }

    async saveDevice(device: IDevice): Promise<IDevice> {
        return new Device(device).save();
    }

    async updateDevice(hardwareUuid: string, device: IDevice): Promise<UpdateQuery<IDevice>> {
        return Device.updateOne({ hardwareUuid: hardwareUuid }, device);
    }

}

export default new DeviceService();