import Entry from '../models/Entry.js';

const createService = (body) => Entry.create(body);

const findAllService = () => Entry.find();

const findByIdService = (id) => Entry.findById(id);

const updateService = (id, product, quantity) => StEntryock.findOneAndUpdate({_id: id}, {product, quantity});

const deleteService = (id) => Entry.findOneAndDelete({_id: id});

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteService // nova função de delete
};
