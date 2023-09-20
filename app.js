const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connections');
const bodyParser = require('body-parser');
const job = require('./models/job');

const { engine } = require('express-handlebars');
const Job = require('./models/job');
// handle bars
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));


const PORT = 3000;
//coloca a porta do servidor numa const


app.listen(PORT, function() {
   console.log(`O Express está rodando na porta ${PORT}`)  
});


//body-parser
app.use(bodyParser.urlencoded({extended: false}))


//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('hanblebars', exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


//static folder
//pasta de arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db.authenticate()
.then(() => {
    console.log('Conectou ao banco com sucesso!');
})
.catch(err => {
    console.log('Ocorreu erro ao conectar.', err)
});


//routes
app.get('/', (req, res) => {
    Job.findAll({order: [
        ['creatAt', 'DESC']
    ]})
    .then(jobs => {
        
        res.render('index', {
            jobs
        });
    })



})

//jobs routes
app.use('/jobs', require('./route/jobs'));
//app.use('/jobs', require('./route/jobs'));