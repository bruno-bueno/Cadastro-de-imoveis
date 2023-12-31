const mysql = require('mysql2/promise');

    //metodo responsavel pela conexão de um banco de dados
    async function connect(){
        try{
            const conexao = await mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.SENHA,
                database: process.env.DB
            });
            console.log("funcionou");
            return conexao;
        }catch(error){
            console.log("não foi possivel conectar: ", error);
            throw error;
        }
        
    }
    // Método responsavel pela execução de um query no Banco de dados
    async function query(sql){
        const conexao = await connect();
        try{
            const [rows] = await conexao.execute(sql);
            console.log(rows);
            console.log("query executada");

            return rows;
        }catch(error){
            console.log("erro ao executar query: ",error);
            return error;
        }finally{
            if(conexao){
                conexao.end();
                console.log("conexao encerrada");
            }
        }
    }
    module.exports = {query};
