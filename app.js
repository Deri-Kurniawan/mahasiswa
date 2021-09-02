// module lists
const express = require('express');
const app = express();

const appConfig = {
    serverPort: 3000,
}

// set middleware
app.use(express.static('public'));
app.use(express.urlencoded());
app.set('view engine', 'ejs');

// set page(s)
app.get('/', (req, res) => {
    res.render('index', {
        title: "Home Page"
    });
});

// start server listener
app.listen(appConfig.serverPort, () => {
    console.log(`Server listen on http://localhost:${appConfig.serverPort}`);
});