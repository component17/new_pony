module.exports = {
    turnOnAll(){
        let color = Models.Settings.getBaseColor();
        let modules = Models.Modules.getAll();

        let res = modules.map((i) => {
            return {
                id: i.did,
                color
            }
        });

        console.log(res);

        io.emit('switch', res);

        let ids = modules.map(i => i.id);
        io.emit('state:modules', ids);

        console.log(res);
    },
    turnOffAll(){
        let color = { r: 0, g: 0, b: 0 };
        let modules = Models.Modules.getAll();

        let res = modules.map((i) => {
            return {
                id: i.did,
                color
            }
        });

        io.emit('switch', res);
        io.emit('state:modules', []);

        console.log(res)
    },
    turnOnByAlias(alias){
        let color = Models.Settings.getBaseColor();
        let module = Models.Modules.getByAlias(alias);
        if(module){
            let modules = Models.Modules.getFilterSection(module.pid);

            let res = modules.map((i) => {
                return {
                    id: i.did,
                    color: i.id === module.id ? color : { r: 0, g: 0, b: 0 }
                }
            });
            io.emit('switch', res);
            io.emit('state:modules', [module.id]);
            console.log(res)
        }
    },
    turnOnById(id){
        let color = Models.Settings.getBaseColor();
        let module = Models.Modules.getById(id);
        if(module){
            let modules = Models.Modules.getFilterSection(module.pid);

            let res = modules.map((i) => {
                return {
                    id: i.did,
                    color: i.id === module.id ? color : { r: 0, g: 0, b: 0 }
                }
            });
            io.emit('switch', res);
            io.emit('state:modules', [module.id]);
            console.log(res)
        }
    }
};