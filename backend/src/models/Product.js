import mongoose from 'mongoose';
import Stock from './Stock.js';

const ProductSchema = new mongoose.Schema({
    product: {
        type: String,
        require: true,
        unique: true,
    },
    price: { 
        type: Number, 
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    inserted_by: {
        type: String,
        require: true,
    }
});

// Definir hook de pós-salvamento para criar um novo documento de Stock
ProductSchema.post('save', async function (doc) {
    const stock = new Stock({
        product: doc.product,
        id_product: doc._id,
        quantity: 0
    });
    

    await stock.save();
});

const Product = mongoose.model("Products", ProductSchema);

export default Product;