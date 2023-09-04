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

    salvarEndereco(){
        let resp = db.query(`INSERT INTO endereco (cep, rua, bairro, numero, cidade, estado) VALUES ('${this.cep}','${this.rua}','${this.bairro}',${this.numero},'${this.cidade}','${this.estado}')`);
        console.log(resp);
        return resp;
    }
}

module.exports=EnderecoModel;