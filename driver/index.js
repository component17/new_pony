// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('sudo', ["python", __dirname + "/test.py", "--leds", "57", "--port", "8080"], {
//     detached: false,
//     stdio: 'pipe'
// });
//
// //pythonProcess.unref();
//
// process.on('exit', () => {
//     pythonProcess.kill()
// });
//
// pythonProcess.stdout.on('data', (data) => {
//     console.log(555);
//     console.log(data.toString());
// });
//
// pythonProcess.on('error', (code) => {
//     console.log('python process error with code ' + code);
// });
//
// pythonProcess.on('exit', (code) => {
//     console.log('python process exited with code ' + code);
// });
//
// pythonProcess.stderr.on('data', (data) => {
//     console.log(`grep stderr: ${data}`);
// });
//
// module.exports = {
//     sendCommand(response){
//         pythonProcess.stdin.write(`${JSON.stringify(response)}`);
//         pythonProcess.stdin.write(`\n`);
//     }
// };

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