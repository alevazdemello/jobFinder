const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');



router.get('/test', (req, res) => {
    res.send('Deu certo');

}); 



router.get('/add', (req, res) => {
    res.render('add');
})

//add o job via post
router.post('/add', (req, res) => {
    //propriedade de requisiçao
    let {title, salary, company, description, email, new_job} = req.body;


    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    //add a vaga e já retorna para a home
    .catch(err => console.log(err));

});


module.exports = router;