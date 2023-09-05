const imovelModel = require('../model/imovelModel');
const enderecoModel = require('../model/enderecoModel');
const imagemModel = require('../model/imagemModel');
let imoveis = [];
let endereco = [];
let imagens = [];

async function getImoveis(req, res) { 
    /*imoveis = await imovelModel.listarImovel();
    imoveis.forEach(async imovel => {
        endereco = await enderecoModel.listarEndereco(imovel.endereco_id);
        imagens = await imagemModel.listarImagens(imovel.id);
        const imovelCompleto=[{
            imovel: imovel,
            endereco: endereco,
            imagens: imagens
        }]
        console.log(imovelCompleto);
        res.render('home', { imovelCompleto }); 
    });*/
    
    try {
        const imoveis = await imovelModel.listarImovel();
        const imovelCompletoList = [];

        for (const imovel of imoveis) {
            const endereco = await enderecoModel.listarEndereco(imovel.endereco_id);
            const imagens = await imagemModel.listarImagens(imovel.id);
            const imovelCompleto = {
                imovel: imovel,
                endereco: endereco,
                imagens: imagens
            };
            imovelCompletoList.push(imovelCompleto);
        }

        res.render('home', { imovelCompleto: imovelCompletoList });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar imóveis');
    }
}

async function addImovel(req,res){
    const { descricao, telefone, valor, cep, estado, cidade, bairro, rua, numero } = req.body;
    const endereco=new enderecoModel(0,cep, rua, bairro, numero, cidade, estado);
    let resp = await endereco.salvarEndereco();
    console.log("resp");
    console.log(resp.insertId);
    const imovel = new imovelModel(0, req.session.user.id_usuario, descricao, telefone, valor, resp.insertId);
    resp = await imovel.salvar();
    console.log(req.files);
    console.log(req.files[0].path);
    const imagem = new imagemModel(0, resp.insertId, req.files[0].path);
    imagem.salvarImagem();
    res.redirect('/home');
}

module.exports = { addImovel, getImoveis };