const collection = require('./collection');

/**
 * 
 * @param {*} collectionPath 
 * @param {*} email 
 * @returns 
 */
const findDataByEmail = (collectionPath, email) => {
    let mahasiswa = collection.getCollection(collectionPath);

    mahasiswa.find(mhs => {
        if (mhs.email == email)
            mahasiswa = mhs;
    });

    return mahasiswa;
}

const removeDataByEmail = (collectionPath, email) => {
    let mahasiswa = collection.getCollection(collectionPath);

    mahasiswa.find(mhs => {
        if (mhs.email != email)
            mahasiswa = mhs;

        return mahasiswa;
    });

}

module.exports = {
    findDataByEmail,
    removeDataByEmail,
}