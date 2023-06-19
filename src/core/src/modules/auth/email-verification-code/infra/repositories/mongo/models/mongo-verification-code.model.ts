import mongoose, { Schema, Document } from 'mongoose';

export interface IVerificationCodeModel extends Document {
    refreshToken: string;
    expirationDate: Date;
}

const verificationCodeSchema: Schema = new Schema({
    code: { type: String, required: true,  },
    userId: { type: String, required: true, unique: true },
    expirationDate: { type: Date, required: true }
});

verificationCodeSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });
verificationCodeSchema.index({ userId: 1, });

export const MongoRefreshTokenModel = mongoose.model<IVerificationCodeModel>('VerificationCode', verificationCodeSchema);
