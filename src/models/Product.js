import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    product: {
        type: String,
        require: true,
        unique: true,
    },
    price: { 
        type: mongoose.Types.Decimal128, 
        default: 0 
    },
    brand: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    inserted_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }

})

const Product = mongoose.model("Products", ProductSchema);

export default Product;