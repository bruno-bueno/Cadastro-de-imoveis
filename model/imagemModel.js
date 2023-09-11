const db = require('./database');
class ImagemModel{
    constructor(id,id_imovel,imagem){
        this.id=id;
        this.id_imovel=id_imovel;
        this.imagem=imagem;
    }

    static async listarImagens(idImovel){
        let tarefas = await db.query(`SELECT * FROM imagens where id_imovel = ${idImovel}`);
        return tarefas;
    }

    async salvarImagem(){
        let resp = await db.query(`INSERT INTO imagens (id_imovel, imagem) VALUES ('${this.id_imovel}','${this.imagem}')`);
        console.log(resp);
        return resp;
    }
    static async deletarImagens(idImovel){
        let resp = await db.query(`DELETE FROM imagens WHERE id_imovel=${idImovel}`);
        console.log(resp);
        return resp;
    }
}

module.exports=ImagemModel;