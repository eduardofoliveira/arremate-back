import * as Yup from "yup";
import jwt from "jsonwebtoken";

import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha na válidação" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const { id, nome } = user;

    return res.json({
      user: {
        id,
        nome,
        email
      },
      token: jwt.sign({ id }, process.env.JWT_PASS, {
        expiresIn: process.env.JWT_EXPIRES
      })
    });
  }
}

export default new SessionController();
