import Exit from '../models/Exit.js';

const createService = (body) => Exit.create(body);

const findAllService = () => Exit.find();

const findByIdService = (id) => Exit.findById(id);

const updateService = (id, product, observation, amount, entry_price, inserted_by, payment, type) => Exit.findOneAndUpdate({_id: id}, {product, observation, amount, entry_price, inserted_by, payment, type });

const deleteService = (id) => Exit.findOneAndDelete({_id: id});
export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService // nova função de delete
};