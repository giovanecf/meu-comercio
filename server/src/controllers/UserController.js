/* 
index - retornar objetoS
show - retorna UM objeto
store - cria um objeto 
update - atualiza um obejto
destroy - deleta um objeto
*/
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { login, password, name } = req.body; //const login = req.body.login;

    //const user = await User.create({ login, password });

    let user = await User.findOne({ login }); //({ login: login})

    if (!user) {
      user = await User.create({ login, password, name });
    }

    return res.json(user);
  },
};
