const userService = require('../services/user.service')

const create = async (req, res) => {
    const { user, password, level, email, phone } = req.body;
    // Verificando se todos os campos foram enviados
    if (!user || !password || !level || !email || !phone) {
        res.status(400).send({
            message: "Submit all fields for resgistration"
        });
    };

    const createUser = await userService.create(req.body)
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

module.exports = { create }