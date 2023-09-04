const imovelModel = require('../model/imovelModel');
const enderecoModel = require('../model/enderecoModel');
const imagemModel = require('../model/imagemModel');

async function addImovel(req,res){
    const { descricao, telefone, valor, cep, estado, cidade, bairro, rua, numero, arquivo } = req.body;
    const endereco=new enderecoModel(0,cep, rua, bairro, numero, cidade, estado);
    const resp = await endereco.salvarEndereco();
    console.log("resp");
    console.log(resp.insertId);
    console.log(arquivo);
    const imovel = new imovelModel(0, req.session.user.id_usuario, descricao, telefone, valor, resp.insertId);
    imovel.salvar();
}

module.exports = { addImovel };