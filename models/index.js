const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const shortid = require('shortid');

const adapter = new FileSync('./db.json');
const db = low(adapter);

db.defaults({
    sections: [],
    modules: [],
    settings: {
        baseColor: {
            r: 255,
            g: 255,
            b: 255
        },
        errorColor: {
            r: 255,
            g: 0,
            b: 0
        }
    }
}).write();

module.exports = {
    Modules: require('./modules.js')(db, shortid),
    Sections: require('./sections.js')(db, shortid),
    Settings: require('./Settings.js')(db, shortid),
};