import mongoose from 'mongoose';
import Stock from './Stock.js';

const EntrySchema = new mongoose.Schema({
    product: {
      type: String,
      required: true,
      unique: false,
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

// hook de pós-salvamento para atualizar a quantidade no estoque
EntrySchema.post('save', async function (doc) {
    const stock = await Stock.findOne({ product: doc.product });
    stock.quantity += doc.amount;
    await stock.save();
});
// hook de pré-remoção para atualizar a quantidade no estoque
EntrySchema.post('findOneAndDelete', async function (doc, next) {
  const stock = await Stock.findOne({ product: doc.product });
  stock.quantity -= doc.amount;
  await stock.save();
  next();
});

const Entry = mongoose.model("Entrys", EntrySchema);

export default Entry;
