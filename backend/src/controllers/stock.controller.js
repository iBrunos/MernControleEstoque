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
        message: "There are no registered stock",
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
    const { id } = req.params; // Obtenha o ID do produto dos parâmetros da requisição
    const { quantity } = req.body; // Obtenha a quantidade a ser atualizada do corpo da requisição

    // Verifique se a quantidade é um número válido
    if (isNaN(quantity)) {
      return res.status(400).send({ message: "Quantity must be a valid number" });
    }

    const updatedItem = {
      quantity: Number(quantity),
    };

    await stockService.updateService(id, updatedItem.quantity);

    res.send({
      message: "Stock successfully updated",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { createService, findAll, findById, update, deleteProduct};