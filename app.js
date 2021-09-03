// module lists
const mhs_module = require('./locale_modules/mahasiswa');
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
        title: 'Mahasiswa',
        mahasiswa: collection.getCollection('mahasiswa/data'),
    });
});

app.get('/mahasiswa/add', (req, res) => {
    collection.make('mahasiswa', 'mahasiswa/data');
    res.render('mahasiswa/add', {
        title: 'Add Mahasiswa Data'
    });
});

app.get('/mahasiswa/:email/detail', (req, res) => {

    res.render('mahasiswa/detail', {
        title: 'Mahasiswa Detail',
        mahasiswa: mhs_module.findDataByEmail('mahasiswa/data', req.params.email),
    });
});

app.get('/mahasiswa/:email/edit', (req, res) => {
    const email = req.params.email;

    res.render('mahasiswa/edit', {
        title: 'Edit Mahasiswa Data',
        mahasiswa: mhs_module.findDataByEmail('mahasiswa/data', email),
    });
});

app.post('/mahasiswa/verify/:type', (req, res) => {
    const type = req.params.type;

    switch (type) {
        case 'save':
            collection.insertData('mahasiswa/data', req.body);
            res.redirect('/mahasiswa');
            break;
        case 'update':
            const updateMahasiswa = () => {
                let body = req.body;
                let temp = [];
                mahasiswa = collection.getCollection('mahasiswa/data');
                mahasiswa.forEach((mhs) => {
                    if (mhs.email == body.email) {
                        mhs.name = body.name
                        mhs.email = body.email
                    }
                    temp.push(mhs);
                });

                collection.clearAndSaveData('mahasiswa/data', mahasiswa);
                res.redirect('/mahasiswa');
            }

            updateMahasiswa();
            break;

        case 'delete':
            const deleteMahasiswa = () => {
                let email = req.body.email;
                let temp = [];
                mahasiswa = collection.getCollection('mahasiswa/data');
                mahasiswa.forEach((mhs) => {
                    if (mhs.email != email) {
                        temp.push(mhs);
                    }
                })

                collection.clearAndSaveData('mahasiswa/data', temp);
                res.redirect('/mahasiswa');
            }
            deleteMahasiswa();
            break;
        default:
            break;
    }
    res.end();
});

app.use(express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// page not found handler
app.use('/', (req, res) => {
    res.status(404);
    res.render('errors/404', {
        title: 'Page not found!'
    });
});

// start server listener
app.listen(appConfig.serverPort, () => {
    console.log(`Server listen on http://localhost:${appConfig.serverPort}`);
});