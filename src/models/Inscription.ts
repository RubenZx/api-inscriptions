import mongoose, { Schema } from "mongoose";

interface InscriptionType {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  ticket: boolean;
  start: Date;
  end: Date;
}

const InscriptionSchema = new Schema<InscriptionType>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: Number,
  email: { type: String, required: true, unique: true },
  ticket: { type: Boolean, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

export default mongoose.model("Inscription", InscriptionSchema);
