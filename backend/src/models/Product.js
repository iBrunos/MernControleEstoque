import mongoose from 'mongoose';

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

})

const Product = mongoose.model("Products", ProductSchema);

export default Product;