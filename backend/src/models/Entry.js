import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
    product: {
      type: String,
      required: true,
      unique: true,
    },
    observation: {
      type: String,
      unique: false,
    },
    amount: {
      type: Number,
      required: true,
      unique: false,
    },
    entry_price: {
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

const Entry = mongoose.model("Entrys", EntrySchema);

export default Entry;
