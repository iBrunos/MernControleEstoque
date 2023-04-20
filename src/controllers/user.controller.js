const userService = require('../services/user.service')
const mongoose = require("mongoose")

const createService = async (req, res) => {
    const { user, password, level, email, phone } = req.body;
    // Verificando se todos os campos foram enviados
    if (!user || !password || !level || !email || !phone) {
        res.status(400).send({
            message: "Submit all fields for resgistration"
        });
    };

    const createUser = await userService.createService(req.body)
        if (!createUser){
            return res.status(400).send({
                message: "Error creating User"
            })
        }

    res.status(201).send({
        message: "User created successfully",
        user: {
            id: createUser._id,
            user,
            level,
            email,
            phone
        }
    });
};

const findAll = async (req, res) => {
    const users = await userService.findAllService()

    if(users.length === 0 ){
        return res.status(400).send({
            message: "There are no registered users"
        });
    }
    res.send(users)
};
const findById = async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
            message: "Invalid ID"
        });
    }
    const user = await userService.findByIdService(id)

    if(!user){
        return res.status(400).send({
            message: "User not found"
        });
    }
    res.send(user)

}

module.exports = { createService, findAll, findById}