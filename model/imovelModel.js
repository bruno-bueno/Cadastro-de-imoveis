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

    static async listarImoveis(){
        let tarefas = await db.query("SELECT * FROM imovel");
        return tarefas;
    }
    static async listarImoveisUsuario(id){
        let tarefas = await db.query(`SELECT * FROM imovel where id_usuario=${id}`);
        return tarefas;
    }
    static async listarImovel(id){
        let tarefas = await db.query(`SELECT * FROM imovel where id=${id}`);
        return tarefas;
    }
    async salvar(){
        let resp = await db.query(`INSERT INTO imovel (id_usuario, descricao, telefone, valor,endereco_id) VALUES (${this.id_cliente},'${this.descricao}',${this.telefone},${this.valor},${this.endereco_id})`);
        console.log(resp);
        return resp;
    }
    static async deletarImovel(id){
        let resp = await db.query(`DELETE FROM imovel WHERE id=${id}`);
        console.log(resp);
        return resp;
    }
    async editarImovel(id){
        let resp = await db.query(`UPDATE imovel SET descricao='${this.descricao}', telefone=${this.telefone}, valor=${this.valor} WHERE id=${id}`);
        console.log(resp);
        return resp;
    }
}

module.exports=ImovelModel;