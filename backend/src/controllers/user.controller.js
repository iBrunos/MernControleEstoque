import userService from "../services/user.service.js";

const createService = async (req, res) => {
  try {
    const { username, password, level, email, phone } = req.body;
    // Verificando se todos os campos foram enviados
    if (!username || !password || !level || !email || !phone) {
      res.status(400).send({
        message: "Submit all fields for resgistration",
      });
    }

    const createUser = await userService.createService(req.body).catch((err) => console.log(err.message));
    if (!createUser) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }
   
    res.status(201).send({
      message: "User created successfully",
      user: {
        id: createUser.id,
        username,
        password,
        level,
        email,
        phone,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      await userService.deleteService(id);
      res.status(204).end();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const user = await userService.findAllService();

    if (user.length === 0) {
      return res.status(400).send({
        message: "There are no registered users",
      });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  //try {
    const { _id, username, password, level, email, phone } = req.body;

    // Verificando se todos os campos foram enviados
    if (!username && !password && !level && !email && !phone) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }

    await userService.updateService(
      _id,
      username,
      password,
      level,
      email,
      phone
    );
    res.send({
      message: "User successfully updated",
    });
  //} //catch (err) {
    //res.status(500).send({ message: err.message });
  //}
};
export default { createService, findAll, findById, update , deleteUser};
