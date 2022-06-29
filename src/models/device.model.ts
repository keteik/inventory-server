import mongoose, { ObjectId } from "mongoose";

export interface IOs {
    platform: string;
    distro: string;
    release: string;
    codename: string;
    kernel: string;
    arch: string;
    hostname: string;
    serial: string
    build: string
}

export interface ICpu {
    manufacturer: string;
    brand: string;
    vendor: string;
    family: string;
    speed: number;
    cores: number;
    physicalCores: number;
    socket: string;
}

export interface INetwork {
    iface: string;
    ip4: string;
    ip4subnet: string;
    ip6: string;
    ip6subnet: string;
    mac: string;
    speed: number;
    dhcp: boolean;
}

export interface IDevice {
    _id: ObjectId,
    osUuid: string,
    hardwareUuid: string,
    os: IOs,
    cpu: ICpu,
    network: INetwork
}

const deviceSchema = new mongoose.Schema<IDevice>({
    osUuid: { type: String, required: true },
    hardwareUuid: { type: String, required: true },
    os: {
        platform: { type: String, required: true },
        distro: { type: String, required: true },
        release: { type: String, required: true },
        codename: { type: String, required: false },
        kernel: { type: String, required: true },
        arch: { type: String, required: true} ,
        hostname: { type: String, required: true },
        serial: { type: String, required: true },
        build: { type: String, required: true }
    },
    cpu: {
        manufacturer: { type: String, required: true },
        brand: { type: String, required: true },
        vendor: { type: String, required: true },
        family: { type: String, required: true },
        speed: { type: Number, required: true },
        cores: { type: Number, required: true },
        physicalCores: { type: Number, required: true },
        socket: { type: String, required: true }
    },
    network: {
        iface: { type: String, required: true },
        ip4: { type: String, required: true },
        ip4subnet: { type: String, required: true },
        ip6: { type: String, required: true },
        ip6subnet: { type: String, Number: true },
        mac: { type: String, Number: true },
        speed: { type: Number, required: true },
        dhcp: { type: Boolean, required: true } 
    }

});

export const Device = mongoose.model<IDevice>('Device', deviceSchema);