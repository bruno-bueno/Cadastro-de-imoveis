const express = require('express'); 
const app = express(); 
const port = 3000;
const session = require('express-session');
const express_ejs_layouts=require('express-ejs-layouts');
const multer = require('multer');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

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

app.use(express_ejs_layouts);
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 

app.use((req,res,next)=>{
    if(!req.session.user){
        if(req.originalUrl == '/login' || req.originalUrl == '/cadastro' ){
            app.set('layout','./layouts/default/login');
            res.locals.layoutsVariables={
                url : process.env.URL,
                style : "css",
                title : 'Login',
            }
            next();
        }else{
            res.redirect('/login');
        }
    }else{
        app.set('layout','./layouts/default/index.ejs');
        res.locals.layoutsVariables={
            url : process.env.URL,
            style : "css",
            title : 'Home',
            user : req.session.user,
        }
        next();
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


//rotas imoveis do usuario
app.get('/imoveisUsuario',(req,res)=>{
    imovelController.getImoveisUsuario(req,res);
});


//rotas addImovel
app.get('/addImovel',(req,res)=>{
    res.render('addImovel');
});

app.post('/addImovel',upload.array("arquivo") ,(req,res)=>{
    imovelController.addImovel(req,res);
});

//rota delete
app.get('/imovel/deletar/:idImovel',(req,res)=>{
    imovelController.excluirImovel(req,res);
});

//rota logout
app.get('/logout',(req,res)=>{
    usuarioController.logout(req,res);
})

app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});
