const fs = require('fs');

const basePath = __dirname + '/../collections/';

/**
 * Making folder collection based on /collections/$1 folder
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
 * @param folderPath folder target
 * @param filePath file target
 * @return JSON
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
 * collection fetch all based on /collections/$1
 */
const fetchAll = (collectionPath) => {
    const path = basePath + collectionPath;

    return JSON.parse(fs.readFileSync(path));
}

module.exports = {
    makeFolder,
    makeFile,
    make,
    fetchAll,
}