const router = require('express').Router();
const db = require('../../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs')
const path = require('path')

router.get('/notes', (req, res) => {
    let results = db
    res.json(results);
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uniqid();
    let dbJoin = path.join(__dirname, '../../db/db.json');

    if (!newNote) {
        res.send(400);
        db = []
        return;
    }

    db.push(newNote)

    fs.writeFile(dbJoin, JSON.stringify(newNote) , (err) => {
        if (err) {
            console.log (err)
        }
        console.log('success')
    })

    return res.json(newNote)
});

router.delete('/notes/:id', (req, res) => {
    let params = req.params.id;
    let dbJoin = path.join(__dirname, '../../db/db.json');

    for (let i = 0; i < db.length; i++) {
        if (db[i].id === params) {
            db.splice(i, 1);
            break;
        }
    }

    fs.writeFile(dbJoin, JSON.stringify(db), (err) => {
        if (err) {
            console.log (err)
        }
        console.log('deleted')
    });
    return res.json(db);
});

module.exports = router;