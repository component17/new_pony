module.exports = (db, shortid) => {
    return {
        getBaseColor(){
            return db.get('settings.baseColor').value();
        },
        updateBaseColor(color){
            return db.set('settings.baseColor', color).write()
        }
    }
};