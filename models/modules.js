module.exports = (db, shortid) => {
    return {
        getAll(){
            return db.get('modules').value();
        },
        getById(id){
            return db.get('modules').find({ id }).value();
        },
        getByAlias(alias){
            return db.get('modules').find({ alias }).value();
        },
        getFilterSection(pid){
            return db.get('modules').filter({ pid }).value();
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
        },
        update(id, data){
            let res = db.get('modules').find({ id }).assign(data).write();

            io.sockets.emit('models:modules:update', res);

            return Promise.resolve(res);
        },
        delete(id){
            db.get('modules').remove({ id }).write();

            io.sockets.emit('models:modules:delete', id);

            return Promise.resolve();
        }
    }
};