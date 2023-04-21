import Stock from '../models/Stock.js';

const createService = (body) => Stock.create(body);

const findAllService = () => Stock.find();

const findByIdService = (id) => Stock.findById(id);

const updateService = (id, product, quantity) => Stock.findOneAndUpdate({_id: id}, {product, quantity});

const deleteService = (id) => Stock.findOneAndDelete({_id: id});

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService // nova função de delete
};
