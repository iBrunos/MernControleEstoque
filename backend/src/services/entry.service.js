import Entry from '../models/Entry.js';

const createService = (body) => Entry.create(body);

const findAllService = () => Entry.find();

const findByIdService = (id) => Entry.findById(id);

const updateService = (id, product, observation, amount, entry_price, store, inserted_by, type, in_stock, expiration_date) => Entry.findOneAndUpdate({_id: id}, {product, observation, amount, entry_price, store, inserted_by, type, in_stock, expiration_date });

const deleteService = (id) => Entry.findOneAndDelete({_id: id});
export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService // nova função de delete
};