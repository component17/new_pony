module.exports = (db, shortid) => {
    return {
        getAll(){
            return db.get('modules').value();
        },
        create(alias, deviceId, pid){
            console.log({alias, deviceId, pid});
            let res = {
                id: shortid.generate(),
                pid,
                alias,
                did: deviceId,
            };

            db.get('modules').push(res).write();

            io.sockets.emit('models:module:create', res);

            return Promise.resolve();
        }
    }
}