import User from "../models/User";
const Op = require("Sequelize").Op;

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ["id", "nome", "email"]
    });
    return res.json(users);
  }

  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        [Op.or]: {
          email: req.body.email,
          cpf: req.body.cpf
        }
      }
    });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const { id, nome, email } = await User.create(req.body);

    return res.json({ id, nome, email });
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.destroy();

    return res.json({ message: "Usuário removido" });
  }
}

export default new UserController();
