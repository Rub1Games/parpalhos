const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const port = 8080; // eslint-disable-line
app.use(express.static(`${__dirname}/src`));
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

let parpalhos = [];
let nomes = fs.readdirSync('src/parpalhos');

for(const nome of nomes) {
    if(nome.split('.')[1] == 'json')
        parpalhos.push(require('./src/parpalhos/'+ nome));
}

function Update() {
    parpalhos = [];
    nomes = fs.readdirSync('src/parpalhos');
    
    for(const nome of nomes) {
        if(nome.split('.')[1] == 'json')
            parpalhos.push(require('./src/parpalhos/'+ nome));
    }
}

function getParpalho(parpalho) {
    for(let e of parpalhos) {
        if(e.name === parpalho)
            return e;
    }

    return false;
}

app.get('/', (req, res) => {
    return res.render('homepage', {parpalhos});
});

app.get('/parpalho/:parpalho', (req,res) => {
    Update();
    let parpalho = getParpalho(req.params.parpalho);
    if(parpalho === false)
        return res.status(400).json({message: '400 Bad Request'});
    else
        return res.render('parpalho', {parpalho, parpalhos});
})

http.listen(port, () => {
    console.log(`ok ${port}`);
});
