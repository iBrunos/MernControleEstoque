import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
    product: {
        type: String,
        require: true,
        unique: true,
    },
    quantity: { 
        type: mongoose.Types.Decimal128, 
        default: 0 
    }, timestamps: true });

const Stock = mongoose.model("User", StockSchema);

export default Stock;