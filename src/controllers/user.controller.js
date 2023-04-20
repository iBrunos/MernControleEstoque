const userService = require('../services/user.service')

const createService = async (req, res) => {
    const { username, password, level, email, phone } = req.body;
    // Verificando se todos os campos foram enviados
    if (!username || !password || !level || !email || !phone) {
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
            username,
            level,
            email,
            phone
        }
    });
};
const findAll = async (req, res) => {
    const user = await userService.findAllService()

    if(user.length === 0 ){
        return res.status(400).send({
            message: "There are no registered users"
        });
    }
    res.send(user)
};
const findById = async (req, res) => {
    const user = req.user;
    res.send(user)
}
const update = async (req, res) => {
    const { username, password, level, email, phone } = req.body;
    
    // Verificando se todos os campos foram enviados
    if (!username && !password && !level && !email && !phone) {
        res.status(400).send({
            message: "Submit at least one field for update"
        });
    };
    const {id, user} = req;

    await userService.updateService(id, username, password, level, email, phone)
    res.send({
        message: "User successfully updated"
    })
}
module.exports = { createService, findAll, findById, update};