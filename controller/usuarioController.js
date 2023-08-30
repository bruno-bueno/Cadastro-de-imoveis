const usuarioModel = require('../model/usuarioModel');


function login(req,res){
    res.render('login');
}

async function autenticar(req,res){
    console.log(req.body);
    if(req.body.email && req.body.senha){
        let resp = await usuarioModel.autenticar(req.body.email, req.body.senha)
        console.log(resp);
        if(resp.length > 0){
            //Usuario logado
            console.log("usuario logado");
            //res.redirect('/tarefas');
        }else{
            //Usuario invalido
            console.log("vale não")
            res.redirect('/login');
        }
    }
}

function cadastro(req,res){
    res.render('cadastro');
}

async function cadastrar(req,res){
    const { nome, email, senha } = req.body;
    console.log(req.body)
    if(req.body.email && req.body.senha){
        const usuario = new usuarioModel('0', nome, email, senha); 
        usuario.cadastrar();
        res.redirect('/login');
        
    }
}

module.exports={login, autenticar, cadastro, cadastrar}