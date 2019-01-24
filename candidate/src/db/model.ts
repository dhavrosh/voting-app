import * as mongoose from 'mongoose';

export interface Candidate extends mongoose.Document {
  fullName: string;
  company: string;
  description: string;
  avatar: string;
}

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  avatar: { type: String }
});

export const model = mongoose.model<Candidate>('Candidate', candidateSchema);