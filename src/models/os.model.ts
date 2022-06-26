import mongoose, { ObjectId } from "mongoose";

export interface IOs {
    _id: ObjectId,
    platform: string,
    dist: string,
    kernel: string,
    arch: string,
    hostname: string,
    serial: string
    uuid: string
}

const osSchema = new mongoose.Schema<IOs>({
    platform: { type: String, required: true },
    dist: { type: String, required: true },
    kernel: { type: String, required: true },
    arch: { type: String, required: true },
    hostname: { type: String, required: true },
    serial: { type: String, required: true },
    uuid: { type: String, required: true}
});

export const Os = mongoose.model<IOs>('Os', osSchema);