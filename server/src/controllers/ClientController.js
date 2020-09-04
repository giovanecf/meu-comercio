const User = require("../models/User");
const Client = require("../models/Client");

module.exports = {
  async index(req, res) {
    const { name } = req.query; // const name = req.query.name;

    const clients = await Client.find({ name }); //({ nome_propriedade: nome_variavel_local})

    return res.json(clients);
  },

  async store(req, res) {
    const { thumbnail } = req.file;
    const { cpf, name, address, phone } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    const client = await Client.create({
      cpf,
      name,
      phone,
      address,
      thumbnail,
      userId: user_id,
    });

    return res.json(client);
  },
};
