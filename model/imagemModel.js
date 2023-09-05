const db = require('./database');
class ImagemModel{
    constructor(id,id_imovel,imagem){
        this.id=id;
        this.id_imovel=id_imovel;
        this.imagem=imagem;
    }

    static listarImagens(idImovel){
        let tarefas = db.query(`SELECT * FROM imagens where id_imovel = ${idImovel}`);
        return tarefas;
    }

    salvarImagem(){
        let resp = db.query(`INSERT INTO imagens (id_imovel, imagem) VALUES ('${this.id_imovel}','${this.imagem}')`);
        console.log(resp);
        return resp;
    }
}

module.exports=ImagemModel;