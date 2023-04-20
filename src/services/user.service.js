const User = require('../models/User')

const createService = (body) => User.create(body)

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (id, username, password, level, email, phone) => User.findOneAndUpdate({_id: id},{username, password, level, email, phone});

module.exports = {
    createService,
    findAllService,
    findByIdService,
    updateService
}