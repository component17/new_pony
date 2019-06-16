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

        console.log(res)

        io.emit('switch', res);

        console.log(res)
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

        console.log(res)
    },
    turnOnBySection(){

    },
    turnOnByAlias(){

    }
};