// module lists
const express = require('express');
const app = express();

const appConfig = {
    serverPort: 3000,
}

// set middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// set page(s)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.get('/mahasiswa', (req, res) => {
    res.render('mhs/index', {
        title: 'Mahasiswa'
    });
});

//middleware
app.use(express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// start server listener
app.listen(appConfig.serverPort, () => {
    console.log(`Server listen on http://localhost:${appConfig.serverPort}`);
});