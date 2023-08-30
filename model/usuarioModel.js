const md5 = require('md5');
const db = require('./database')

class UsuarioModel{
    constructor(id,nome,email,senha){
        this.id=id;
        this.nome=nome;
        this.email=email;
        this.senha=senha;
    }

    static async autenticar(email, senha){
        let sql=`SELECT * FROM usuarios WHERE email='${email}' AND senha='${md5(senha)}'`
        console.log(sql)
        return await db.query(sql);
    }
    async cadastrar(){
        let sql=`INSERT INTO usuarios (nome, email, senha) VALUES ('${this.nome}', '${this.email}', '${md5(this.senha)}')`
        console.log(sql)
        return await db.query(sql);
    }
}

module.exports=UsuarioModel;