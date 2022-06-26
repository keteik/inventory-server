import mongoose from "mongoose";
import { IOs, Os } from "../models/os.model";

class OsService {
    async getOs(id: mongoose.Types.ObjectId): Promise<IOs | null> {
        return Os.findById(id);
    }
}

export default new OsService();