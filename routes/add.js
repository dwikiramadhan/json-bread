const express = require('express');
const router = express.Router();
const fs = require('fs');

var data = fs.readFileSync('./data/data.json', 'utf8')
var dataParse = JSON.parse(data)

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/add', { title: 'Home' });
});

router.post('/', function (req, res, next) {
    var { string, date } = req.body;
    const integer = Number(req.body.integer);
    const float = Number(req.body.float);
    const boolean = Number(req.body.boolean);
    // console.log(string, integer, float, date, boolean);
    var obj = {
        "id": dataParse.length + 1, "string": string, "integer": integer, "float": float, "date": date, "boolean": boolean
    }
    dataParse.push(obj);
    fs.writeFileSync('./data/data.json', JSON.stringify(dataParse));
    res.redirect('/');
})

module.exports = router;