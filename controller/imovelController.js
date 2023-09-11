const imovelModel = require('../model/imovelModel');
const enderecoModel = require('../model/enderecoModel');
const imagemModel = require('../model/imagemModel');


async function getImoveis(req, res) { 
        const imoveis = await imovelModel.listarImoveis();
        const imovelCompleto = await buscarComplementosImovel(imoveis) 
        res.render('home', { imovelCompleto });
}

async function getImoveisUsuario(req, res) { 
    const imoveis = await imovelModel.listarImoveisUsuario(req.session.user.id_usuario);
    const imovelCompleto = await buscarComplementosImovel(imoveis) 
    res.render('imoveis', { imovelCompleto });
}

async function addImovel(req,res){
    const { descricao, telefone, valor, cep, estado, cidade, bairro, rua, numero } = req.body;
    const endereco=new enderecoModel(0,cep, rua, bairro, numero, cidade, estado);
    let resp = await endereco.salvarEndereco();
    console.log("resp");
    console.log(resp.insertId);
    const imovel = new imovelModel(0, req.session.user.id_usuario, descricao, telefone, valor, resp.insertId);
    resp = await imovel.salvar();
    const imagens=req.files;
    for (const imagem of imagens) {
        const imagemSalva = await new imagemModel(0, resp.insertId, imagem.filename);
        await imagemSalva.salvarImagem();
    }
    
    res.redirect('/home');
}

async function buscarComplementosImovel(imoveis){
    const imovelCompletoList = [];

        for (const imovel of imoveis) {
            const endereco = await enderecoModel.listarEndereco(imovel.endereco_id);
            const imagens = await imagemModel.listarImagens(imovel.id);
            const imovelCompleto = {
                imovel: imovel,
                endereco: endereco[0],
                imagens: imagens
            };
            console.log(imagens);
            imovelCompletoList.push(imovelCompleto);
        }

    return imovelCompletoList;
}
async function excluirImovel(req,res){
    const { idImovel } = req.params;
    const imovel = await imovelModel.listarImovel(idImovel);
    await imagemModel.deletarImagens(idImovel);
    await imovelModel.deletarImovel(idImovel);
    console.log(imovel[0]);
    await enderecoModel.deletarEndereco(imovel[0].endereco_id);

    res.redirect('/home');
}

async function mostrarEditarImovel(req,res){
    const { idImovel } = req.params;
    const imoveis = await imovelModel.listarImovel(idImovel);
    const imovelCompleto = await buscarComplementosImovel(imoveis) 
    res.render('editImovel', { imovelCompleto });
}

async function editarImovel(req,res){
    const { idImovel } = req.params;
    const { descricao, telefone, valor, cep, estado, cidade, bairro, rua, numero } = req.body;
    const endereco=new enderecoModel(0,cep, rua, bairro, numero, cidade, estado);
    let resp = await endereco.editarEndereco(idImovel);
    console.log("resp");
    console.log(resp.insertId);
    const imovel = new imovelModel(0, req.session.user.id_usuario, descricao, telefone, valor, resp.insertId);
    resp = await imovel.editarImovel(idImovel);
    const imagens=req.files;
    for (const imagem of imagens) {
        const imagemSalva = await new imagemModel(0, resp.insertId, imagem.filename);
        await imagemSalva.salvarImagem();
    }
    console.log("editar")
    res.redirect('/home');
}

module.exports = { addImovel, getImoveis, getImoveisUsuario, excluirImovel, mostrarEditarImovel, editarImovel };