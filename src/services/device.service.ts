import { Query, QueryOptions, UpdateQuery } from "mongoose";
import { IDevice, Device, IOs } from "../models/device.model";

class DeviceService {
    async getDevice(hardwareUuid: string): Promise<IDevice  | null> {
        return Device.findOne({ hardwareUuid: hardwareUuid } );
    }

    async getDevices(): Promise<IDevice []> {
        return Device.find();
    }

    async saveDevice(device: IDevice): Promise<IDevice> {
        return new Device(device).save();
    }

    async updateDevice(hardwareUuid: string, device: IDevice): Promise<IDevice | null> {
        return Device.findOneAndUpdate({ hardwareUuid: hardwareUuid }, device);
    }

    async deleteDevice(hardwareUuid: string): Promise<IDevice | null> {
        return Device.findOneAndDelete({ hardwareUuid: hardwareUuid });
    }

    async getDeviceOs(hardwareUuid: string): Promise<IOs | null> {
        return Device.findOne( { hardwareUuid: hardwareUuid }, {
            cpu: 0,
            network: 0
        });
    }

    async getDeviceCpu(hardwareUuid: string): Promise<IOs | null> {
        return Device.findOne( { hardwareUuid: hardwareUuid }, {
            os: 0,
            network: 0
        });
    }

    async getDeviceNetwork(hardwareUuid: string): Promise<IOs | null> {
        return Device.findOne( { hardwareUuid: hardwareUuid }, {
            cpu: 0,
            os: 0
        });
    }
}

export default new DeviceService();