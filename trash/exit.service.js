import Exit from '../models/Exit.js';

const createService = (body) => Exit.create(body)

const findAllService = () => Exit.find();

const findByIdService = (id) => Exit.findById(id);

const updateService = (id, product, observation, amount, exit_price, inserted_by, type) => Entry.findOneAndUpdate({_id: id},{product, observation, amount, exit_price, inserted_by, type});

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
};