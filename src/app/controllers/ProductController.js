import Product from "../models/Product";
import File from "../models/File";
// import moment from "moment";

class ProductController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.findAll({
      attributes: ["id", "nome", "valor", "tempo", "data_inicio"],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: "imagem",
          attributes: ["id", "nome", "path", "url"]
        }
      ]
    });

    res.json(products);
  }

  async store(req, res) {
    const { nome, valor, tempo, fk_id_file } = req.body;
    const { data_inicio } = req.body;

    // data_inicio = moment(data_inicio).add(1, "hours");

    const product = await Product.create({
      nome,
      valor,
      tempo,
      data_inicio,
      fk_id_file
    });

    res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    let product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const { nome, valor, tempo, fk_id_file } = req.body;
    const { data_inicio } = req.body;

    // data_inicio = moment(data_inicio).add(1, "hours");

    product = await product.update({
      nome,
      valor,
      tempo,
      data_inicio,
      fk_id_file
    });

    res.json(product);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await product.destroy();
    res.json({ message: "Produto removido" });
  }
}

export default new ProductController();
