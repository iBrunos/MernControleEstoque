import stockService from "../services/stock.service.js";

const createService = async (req, res) => {
  try {
    const { product, quantity} = req.body;
    // Verificando se todos os campos foram enviados
    if (!product || !quantity) {
      res.status(400).send({
        message: "Submit all fields for resgistration",
      });
    }


    const createStock = await stockService.createService(req.body).catch((err) => console.log(err.message));
    if (!createStock) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }
    
   
    res.status(201).send({
      message: "Stock created successfully",
      product: {
        id: createStock.id,
        product,
        quantity,

      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
      await stockService.findByIdAndDelete(id);
      res.status(204).end();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const stock = await stockService.findAllService();

    if (stock.length === 0) {
      return res.status(400).send({
        message: "There are no registered users",
      });
    }
    res.send(stock);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const stock = req.user;
    res.send(stock);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Verificando se todos os campos foram enviados
    if (!product && !quantity) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }
    const { id, user } = req;

    await userService.updateService(
      id,
      product,
      quantity,
    );
    res.send({
      message: "Stock successfully updated",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default { createService, findAll, findById, update, deleteProduct};
