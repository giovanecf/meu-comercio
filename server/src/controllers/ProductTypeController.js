/* 
index - retornar objetoS
show - retorna UM objeto
store - cria um objeto 
update - atualiza um obejto
destroy - deleta um objeto
*/

const ProductTyper = require('./../models/ProductType');

module.exports = {

    async index(req, res){

        const { description, price, stock } = req.body;
        const { user_cod } = req.headers;
        const productTypes = ProductTyper.find({ });

    },

    async store(req, res) {

        const { description, price, stock } = req.body;

        const productType = await ProductTyper.findOne({ description: description }); //find({ description: description });

        if(productType){
            return res.status(400).json({ error: 'Product already exists!'});
        }

        const productTypeReturned = await ProductTyper.create({
            description,
            price,
            stock,
        });

        return res.json(productTypeReturned);


    }
};