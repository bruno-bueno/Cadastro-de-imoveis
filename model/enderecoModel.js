const db = require('./database');
class EnderecoModel{
    constructor(id,cep,rua,bairro,numero,cidade,estado){
        this.id=id;
        this.cep=cep;
        this.rua=rua;
        this.bairro=bairro;
        this.numero=numero;
        this.cidade=cidade;
        this.estado=estado;
    }
    static async listarEndereco(id){
        let resp = await db.query(`SELECT * FROM endereco WHERE id=${id}`);
        return resp;
    }

    async salvarEndereco(){
        let resp =await db.query(`INSERT INTO endereco (cep, rua, bairro, numero, cidade, estado) VALUES ('${this.cep}','${this.rua}','${this.bairro}',${this.numero},'${this.cidade}','${this.estado}')`);
        console.log(resp);
        return resp;
    }
    
    static async deletarEndereco(id){
        let resp = await db.query(`DELETE FROM endereco WHERE id=${id}`);
        console.log(resp);
        return resp;
    }
     async editarEndereco(id){
        let resp = await db.query(`UPDATE endereco SET cep='${this.cep}', estado='${this.estado}', cidade='${this.cidade}', bairro='${this.bairro}', rua='${this.rua}', numero='${this.numero}'  WHERE id=${id}`);
        console.log(resp);
        return resp;
    }
}

module.exports=EnderecoModel;