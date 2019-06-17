const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

process.title = "PONY EXPRESS";

const cleanExit = () => {
    console.log('\nServer stopped!!!');
    process.exit()
};
process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);

global.io = require('socket.io')(server);
global.Models = require('./models/index.js');
global.Driver = require('./driver/index.js');

// const spawn = require("child_process").spawn;


server.listen(3000, () => {
    console.log('Start server 3000 port');

    // const pythonProcess = spawn('sudo', ["python3", __dirname + "/driver.py", "--port", "3000"], {
    //     detached: false,
    //     stdio: 'pipe'
    // });
    //
    // process.on('exit', () => {
    //     pythonProcess.kill()
    // });
    //
    // pythonProcess.on('error', (code) => {
    //     console.log('python process error with code ' + code);
    // });
    //
    // pythonProcess.on('exit', (code) => {
    //     console.log('python process exited with code ' + code);
    // });

});

app.use(express.static(__dirname + '/public'));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {

    if (req.url !== '/') {

        let data = {
            headers: req.headers,
            method: req.method,
            url: req.url,
            body: req.body
        };

        io.sockets.emit('log:http', data);
    }

    next();
});

const api_v1 = require('./api/v1/index');

app.use('/api/v1', api_v1);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

io.on('connection', (socket) => {

    console.log('Connected new socket client');

    socket.on('sensor:detect', (id) => {
        console.log('Sensor: ' + id);
    });

    socket.on('switch:status', (id) => {
        console.log('switch:status: ' + id);
    });

    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});


let schema = {
    type: 'barcode_scan',
    next: {
        type: 'count',
        next: {
            type: 'options',
            data: [
                {
                    key: 'sn',
                    label: 'Серийный номер'
                }
            ]
        }
    }

};


