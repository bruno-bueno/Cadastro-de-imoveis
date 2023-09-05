const express = require('express'); 
const app = express(); 
const port = 3000;
const session = require('express-session');
const multer = require('multer');
const path = require('path');

app.use(session({secret: '1i2n3f4o'}));

const usuarioController = require('./controller/usuarioController');
const imovelController = require('./controller/imovelController');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename: function(req,file,cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage, limits: { files: 5 } })

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    if(req.session.usuarios){
        res.redirect('/home');
    }
    else{
        res.redirect('/login');
    }
});

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
    imovelController.getImoveis(req,res);
});

//rotas addImovel
app.get('/addImovel',(req,res)=>{
    res.render('addImovel');
});

app.post('/addImovel',upload.array("arquivo") ,(req,res)=>{
    imovelController.addImovel(req,res);
});


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});
