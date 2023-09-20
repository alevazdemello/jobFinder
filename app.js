const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connections');
const bodyParser = require('body-parser');


const { engine } = require('express-handlebars');
const Job = require('./models/Job');

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

    let search = req.query.job;
    let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
  
    if(!search) {
      Job.findAll({order: [
        ['createdAt', 'DESC']
      ]})
      .then(jobs => {
    
        res.render('index', {
          jobs
        });
    
      })
      .catch(err => console.log(err));
    } else {
      Job.findAll({
        where: {title: {[Op.like]: query}},
        order: [
          ['createdAt', 'DESC']
      ]})
      .then(jobs => {
        console.log(search);
        console.log(search);
    
        res.render('index', {
          jobs, search
        });
    
      })
      .catch(err => console.log(err));
    }
  
    
  });
  
  // jobs routes
  app.use('/jobs', require('./route/jobs'));