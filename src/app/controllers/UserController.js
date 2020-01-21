import * as Yup from "yup";
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
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na válidação" });
    }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      oldPassword: Yup.string()
        .required()
        .min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when("password", (password, field) => {
        return password ? field.required().oneOf([Yup.ref("password")]) : field;
      })
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na válidação" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "Email já esta cadastrado" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const { id, nome } = await user.update(req.body);

    return res.json({ id, nome, email });
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();

    return res.json({ message: "Usuário removido" });
  }
}

export default new UserController();
