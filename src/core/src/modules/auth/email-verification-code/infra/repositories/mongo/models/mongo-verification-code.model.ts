import mongoose, { Schema, Document } from 'mongoose';

export interface IVerificationCodeModel extends Document {
    code: string;
    userId: string
    expirationDate: Date;
}

const verificationCodeSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true  },
    userId: { type: String, required: true, unique: true },
    expirationDate: { type: Date, required: true }
});

verificationCodeSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });
verificationCodeSchema.index({ userId: 1, });

export const MongoVerificationCodeModel = mongoose.model<IVerificationCodeModel>('VerificationCode', verificationCodeSchema);
