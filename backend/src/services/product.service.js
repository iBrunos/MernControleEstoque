import Product from '../models/Product.js';

const createService = (body) => Product.create(body)

const findAllService = () => Product.find();

const findByIdService = (id) => Product.findById(id);

const updateService = (id, product, price, brand, description, inserted_by) => Product.findOneAndUpdate({_id: id},{product, price, brand, description, inserted_by});

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
};