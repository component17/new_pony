let Schema = require('validate');
const shortid = require('shortid');

module.exports = (db, table, schema) => {
    return {
        schema: new Schema(schema),
        getAll(relation) {
            let list = db.get(table).value();

            if (relation) {
                list = this.relation(list, relation)
            }

            return Promise.resolve(list);
        },
        getById(id, relation) {
            let res = db.get(table).find({id}).value();

            if (res) {
                if (arguments.length === 2 && relation) {
                    this.relation(res, relation)
                }

                return Promise.resolve(res);
            } else {
                return Promise.resolve(null)
            }

        },
        getFilter(filter, relation) {
            let list = db.get(table).filter(filter).value();

            if (arguments.length === 2 && relation) {
                list = this.relation(list, relation)
            }

            return Promise.resolve(list);
        },
        create(data) {
            let errors = this.schema.validate(data);

            if (errors[0]) {
                return Promise.reject({error: errors[0].message})
            }

            let findDouble = db.get(table).find({title: name}).value();

            if (findDouble) {
                return Promise.reject({error: 'Группа с данным именем существует!'})
            }

            let res = Object.assign({id: shortid.generate()}, data);

            db.get(table).push(res).write();

            io.sockets.emit(`model:${table}:create`, res);

            return Promise.resolve(res);
        },
        update(id, data) {
            let errors = this.schema.validate(data);

            if (errors[0]) {
                return Promise.reject({error: errors[0].message})
            }

            let findDouble = db.get(table).find({title: name}).value();

            if (findDouble) {
                return Promise.reject({error: 'Группа с данным именем существует!'})
            }

            delete data.id;

            let res = db.get(table).find({id}).assign(data).write();

            io.sockets.emit(`model:${table}:update`, res);

            return Promise.resolve(res);
        },
        delete(id) {
            db.get(table).remove({id}).write();

            io.sockets.emit(`model:${table}:delete`, id);

            return Promise.resolve();
        },
        async deleteFilter(filter) {
            let list = await this.getFilter(filter);
            db.get(table).remove(filter).write();

            let ids = list.map(i => {
                io.sockets.emit(`model:${table}:delete`, i.id);
                return i.id;
            });

            return Promise.resolve(ids);
        },
        relation(data, relation) {
            if (data.isArray()) {
                switch (relation.type) {
                    case 'many':
                        data = data.map((i) => {
                            let filter = {};
                            filter[relation.parent_key] = i.id;

                            i[table + +'s'] = db.get(relation.model).filter(filter).value();
                            return i;
                        });
                        break;
                    case 'one':
                        data = data.map((i) => {
                            i[table] = db.get(relation.model).find({id: i.id}).value();
                            return i;
                        });
                        break;
                    default:
                        break;
                }
            } else {
                switch (relation.type) {
                    case 'many':
                        let filter = {};
                        filter[relation.parent_key] = data.id;
                        data[table + +'s'] = db.get(relation.model).filter(filter).value();
                        break;
                    case 'one':
                        data[table] = db.get(relation.model).find({id: data.id}).value();
                        break;
                    default:
                        break;
                }
            }
            return data;
        }
    }
};