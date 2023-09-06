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
            req.session.user={
                id_usuario: resp[0].id,
                nome: resp[0].nome,
                email: resp[0].email
            };
            res.redirect('/home');
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
    if(nome && email && senha){
        const usuario = new usuarioModel('0', nome, email, senha); 
        const resp=await usuario.cadastrar();
        console.log("controler")
        console.log(resp)
        if(!resp.errno){
            res.redirect('/login');
        }
        
    }
}
function logout(req,res){
    delete req.session.user;
    res.redirect('/login')
}

module.exports={login, autenticar, cadastro, cadastrar, logout}