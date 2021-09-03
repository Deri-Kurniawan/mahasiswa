const collection = require('./collection');
const fs = require('fs');

const fetchAll = () => {
    return JSON.parse(fs.readFileSync('/mahasiswa/data.json'));
}

module.exports = {
    fetchAll,
}