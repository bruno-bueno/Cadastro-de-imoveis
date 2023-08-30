const express = require('express'); 
const app = express(); 
const port = 3000;

const usuarioController = require('./controller/usuarioController');

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 

//rotas login
app.get('/login',(req,res)=>{ 
    usuarioController.login(req,res);
});
app.post('/login',async (req,res)=>{
    await usuarioController.autenticar(req,res);
})

//rotas cadastro
app.get('/cadastro',(req,res)=>{ 
    usuarioController.cadastro(req,res);
});
app.post('/cadastro',async (req,res)=>{
    await usuarioController.cadastrar(req,res);
})

app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});
