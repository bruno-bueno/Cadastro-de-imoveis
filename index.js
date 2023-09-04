const express = require('express'); 
const app = express(); 
const port = 3000;
const session = require('express-session');

app.use(session({secret: '1i2n3f4o'}));

const usuarioController = require('./controller/usuarioController');
const imovelController = require('./controller/imovelController');

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
app.post('/cadastro', async (req,res)=>{
    await usuarioController.cadastrar(req,res);
})

//rotas home
app.get('/home',(req,res)=>{
    res.render('home');
});

//rotas addImovel
app.get('/addImovel',(req,res)=>{
    res.render('addImovel');
});

app.post('/addImovel',(req,res)=>{
    imovelController.addImovel(req,res);
});


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});
