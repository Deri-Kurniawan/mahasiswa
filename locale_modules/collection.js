const fs = require('fs');

const basePath = __dirname + '/../collections/';

/**
 * Making folder collection based on /collections/$1 folder
 * @param {String} folderPath 
 * @returns object
 */
const makeFolder = (folderPath) => {
    const path = basePath + folderPath;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        return {
            error: false,
            message: `Folder is successfuly created on path ${path}`,
        }
    }

    return {
        error: true,
        message: `File is exists for path : ${path}`,
    }
}

/**
 * Making file collection based path on /collections/$1 folder
 * @param {String} filePath automatic add json at the end of file
 * @returns object
 */
const makeFile = (filePath) => {
    const path = basePath + filePath + '.json';

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '[]');
        return {
            error: false,
            message: `Folder is successfuly created on path ${path}`,
        }
    }

    return {
        error: true,
        message: `File is exists for path : ${path}`,
    }
}

/**
 * Collections Maker
 * 
 * @param {String} folderPath folder target
 * @param {String} filePath file target
 * @return Object
 */
const make = (folderPath, filePath) => {
    const makeFolderStatus = makeFolder(folderPath);
    const makeFileStatus = makeFile(filePath);

    return {
        makeFolder: makeFolderStatus,
        makeFile: makeFileStatus,
    }
}

/**
 * Read Collection and get as Object | path based on /collections/$1
 * @param {*} collectionPath 
 * @param {*} encoding 
 * @returns Object
 */
const getCollection = (collectionPath, encoding = 'utf-8') => {
    return JSON.parse(fs.readFileSync(basePath + collectionPath, {
        encoding
    }));
}

/**
 * Iserting data to collection
 * @param {String} collectionPath 
 * @param {Object} newData 
 */
const insertData = (collectionPath, newData) => {
    let objectData = getCollection(collectionPath);
    objectData.push(newData);
    fs.writeFileSync(basePath + collectionPath, JSON.stringify(objectData));
}

module.exports = {
    makeFolder,
    makeFile,
    make,
    getCollection,
    insertData,
}