import { db } from "../db.js";
import {
  createUserValidationObjectSchema,
  updateUserValidationObjectSchema,
} from "../validation/index.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const { error } = createUserValidationObjectSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 0,
      message: error?.details[0].message,
    });
  }

  const q =
    "INSERT INTO usuarios(`apiToken`, `nome`, `email`, `senha`, `fone`, `plano`) VALUES(?)";
  const { apiToken, nome, email, senha, fone, plano } = req.body;

  const values = [apiToken, nome, email, senha, fone, plano];

  db.query(q, [values], (err, data) => {
    if (err)
      return res.status(400).json({
        status: 0,
        message: err.sqlMessage,
      });

    return res.status(200).json({
      status: 1,
      id: data.insertId,
      message: "Usuário criado com sucesso.",
    });
  });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { error } = updateUserValidationObjectSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 0,
      message: error?.details[0].message,
    });
  }

  const query = "SELECT * FROM usuarios WHERE `id` = ?";

  db.query(query, [id], (err, data) => {
    if (!data.length)
      return res.status(404).json({
        status: 0,
        id,
        message: `cannot find user with id ${id}`,
      });

    const user = data[0];
    const { nome, email, fone, senha, plano } = req.body;

    const updateQuery =
      "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `senha` = ?, `plano` = ? WHERE `id` = ?";

    const values = [
      nome ? nome : user.nome,
      email ? email : user.email,
      fone ? fone : user.fone,
      senha ? senha : user.senha,
      plano ? plano : user.plano,
    ];

    return db.query(updateQuery, [...values, id], (err) => {
      if (err)
        return res.status(400).json({
          status: 0,
          message: err.sqlMessage,
        });

      return res.status(200).json({
        status: 1,
        id,
        message: "user updated successfully",
      });
    });
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
