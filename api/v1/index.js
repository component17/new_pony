const express = require('express');
const router = express.Router();

router.post('/settings/base-color', (req, res) => {
    Models.Settings.updateBaseColor(req.body);
    res.status(200).json("ok")
});

router.get('/sections', (req, res) => {
    Models.Sections.getAll('modules').then((data) => {
        res.status(200).json(data);
    }).catch(() => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    })
});

router.get('/sections/:id', (req, res) => {
    Models.Sections.getById(req.params.id,'modules').then((data) => {
        res.status(200).json(data);
    }).catch(() => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    })
});

router.post('/sections', (req, res) => {
    Models.Sections.create(req.body.title).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({ err })
    });
});

router.post('/sections/:id', (req, res) => {
    Models.Sections.update(req.params.id, req.body).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    });
});

router.delete('/sections/:id', (req, res) => {
    Models.Sections.delete(req.params.id).then((data) => {
        res.status(200).json('ok');
    }).catch((err) => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    });
});

router.post('/modules', (req, res) => {
    Models.Modules.create(req.body.name, req.body.did, req.body.pid).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    })
});

router.post('/modules/:id', (req, res) => {
    Models.Modules.update(req.params.id, req.body).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    });
});

router.delete('/modules/:id', (req, res) => {
    Models.Modules.delete(req.params.id).then((data) => {
        res.status(200).json('ok');
    }).catch((err) => {
        res.status(500).json({err: 'Произошла ошибка на сервере!'})
    });
});

router.get('/turn/on/all', (req, res) => {
    Driver.turnOnAll();
    res.status(200).json('ok');
});

router.get('/turn/off/all', (req, res) => {
    Driver.turnOffAll();
    res.status(200).json('ok');
});

router.get('/turn/id/:id', (req, res) => {
    Driver.turnOnById(req.params.id);
    res.status(200).json('ok');
});

router.post('/turn/alias', (req, res) => {
    Driver.turnOnByAlias(req.body.alias);
    res.status(200).json('ok');
});

module.exports = router;