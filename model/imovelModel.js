const db = require('./database');

class ImovelModel{
    constructor(id,id_cliente,descricao,telefone,valor,endereco_id){
        this.id=id;
        this.id_cliente=id_cliente;
        this.descricao=descricao;
        this.telefone=telefone;
        this.valor=valor;
        this.endereco_id=endereco_id;
    }

    salvar(){
        let resp = db.query(`INSERT INTO imovel (id_usuario, descricao, telefone, valor,endereco_id) VALUES (${this.id_cliente},'${this.descricao}',${this.telefone},${this.valor},${this.endereco_id})`);
        console.log(resp);
    }
}

module.exports=ImovelModel;