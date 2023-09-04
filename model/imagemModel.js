const db = require('./database');
class ImagemModel{
    constructor(id,id_imovel,imagem){
        this.id=id;
        this.id_imovel=id_imovel;
        this.imagem=imagem;
    }

}

module.exports=ImagemModel;