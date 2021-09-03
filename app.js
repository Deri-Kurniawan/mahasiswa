// module lists
const mahasiswa = require('./locale_modules/mahasiswa');
const collection = require('./locale_modules/collection');
const express = require('express');
const app = express();

const appConfig = {
    serverPort: 3000,
}

// set middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.set('view engine', 'ejs');

// set page(s)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

app.get('/mahasiswa', (req, res) => {
    res.render('mahasiswa/index', {
        title: 'Mahasiswa'
    });
});

app.get('/mahasiswa/add', (req, res) => {
    collection.make('mahasiswa', 'mahasiswa/data');
    res.render('mahasiswa/add', {
        title: 'Add Mahasiswa Data'
    });
});

app.get('/mahasiswa/:id/detail', (req, res) => {
    const paramID = req.params.id;

    res.render('mahasiswa/detail', {
        title: 'Mahasiswa Detail'
    });
});

app.get('/mahasiswa/:id/edit', (req, res) => {
    const paramID = req.params.id;

    res.render('mahasiswa/edit', {
        title: 'Edit Mahasiswa Data'
    });
});

app.post('/mahasiswa/verify/:type', (req, res) => {
    const type = req.params.type;

    switch (type) {
        case 'save':
            collection.insertData('mahasiswa/data.json', req.body);
            break;

        default:
            break;
    }
    res.end();
});

app.use(express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// start server listener
app.listen(appConfig.serverPort, () => {
    console.log(`Server listen on http://localhost:${appConfig.serverPort}`);
});