import Stock from '../models/Stock.js';

const createService = (body) => Exit.create(body)

const findAllService = () => Exit.find();

const findByIdService = (id) => Exit.findById(id);

const updateService = (id, product, quantity) => Entry.findOneAndUpdate({_id: id},{product, quantity});

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
};