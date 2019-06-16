module.exports = (db, shortid) => {
    return {
        create(name){
            if(!name){
                return Promise.reject('Параметр "наименование" обязателен!')
            }
            if(typeof name !== "string"){
                return Promise.reject('Параметр "наименование" должен быть строкой!')
            }

            let findDouble = db.get('sections').find({ title: name }).value();

            if(findDouble){
                return Promise.reject('Группа с данным именем существует!')
            }

            let res = {
                id: shortid.generate(),
                title: name
            };

            db.get('sections').push(res).write();

            io.sockets.emit('models:sections:create', res);

            return Promise.resolve(res);
        },
        getAll(relation = undefined){
            let sections = db.get('sections').value();

            if(relation){
                sections = sections.map((i) => {
                    i[relation] = db.get(relation).filter({pid: i.id}).value();
                    return i;
                })
            }

            return Promise.resolve(sections);
        },
        getById(id, relation = undefined){
            let res = db.get('sections').find({ id }).value();

            if(res){
                if(arguments.length === 2 && relation){
                    res[relation] = db.get(relation).filter({pid: res.id}).value();
                }

                return Promise.resolve(res);
            }else{
                return Promise.resolve(null)
            }
        },
        update(id, data){
            let res = db.get('sections').find({ id }).assign(data).write();

            io.sockets.emit('models:sections:update', res);

            return Promise.resolve(res);
        },
        delete(id){
            db.get('sections').remove({ id }).write();

            io.sockets.emit('models:sections:delete', id);

            return Promise.resolve();
        }
    }
};