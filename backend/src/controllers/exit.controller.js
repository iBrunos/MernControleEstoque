import exitService from "../services/exit.service.js";

const createService = async (req, res) => {
  try {
    const { product, observation, amount, exit_price, inserted_by, type } = req.body;
    // Verificando se todos os campos foram enviados
    if (!product || !amount || !exit_price || !inserted_by || !type) {
      res.status(204).send({
        message: "Submit all fields for resgistration",
      });
    }

    const createExit = await exitService.createService(req.body).catch((err) => console.log(err.message));
    if (!createExit) {
      return res.status(400).send({
        message: "Error creating Exit",
      });
    }
    
   
    res.status(201).send({
      message: "Exit created successfully",
      user: {
        id: createExit.id,
        product,
        observation,
        amount,
        exit_price,
        inserted_by,
        type,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteExit = async (req, res) => {
    try {
      const { id } = req.params;
      await exitService.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const findAll = async (req, res) => {
  try {
    const exit = await exitService.findAllService();

    if (exit.length === 0) {
      return res.status(400).send({
        message: "There are no registered exits",
      });
    }
    res.send(exit);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const exit = req.product;
    res.send(exit);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { product, observation, amount, exit_price, inserted_by, type } = req.body;

    // Verificando se todos os campos foram enviados
    if (!product && !observation && !amount && !exit_price && !inserted_by && !type) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }
    const {id} = req;

    await exitService.updateService(
      id,
      product,
      observation,
      amount,
      exit_price,
      inserted_by,
      type
    );
    res.send({
      message: "Exit successfully updated",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default { createService, findAll, findById, update, deleteExit};