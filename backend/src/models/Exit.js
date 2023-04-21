import mongoose from 'mongoose';

const ExitSchema = new mongoose.Schema({
    product: {
      type: String,
      required: true,
      unique: true,
    },
    observation: {
      type: String,
      required: false,
      unique: false,
    },
    amount: {
      type: Number,
      required: true,
      unique: false,
    },
    exit_price: {
      type: Number,
      required: true,
      unique: false,
    },
    inserted_by: {
      type: String,
      required: true,
      unique: false,
    },
    type: {
      type: String,
      required: true,
      unique: false,
    }
}, { timestamps: true });

const Exit = mongoose.model("Exits", ExitSchema);

export default Exit;