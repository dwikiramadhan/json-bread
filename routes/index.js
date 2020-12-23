const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs');

const readJson = fs.readFileSync('./data/data.json');
let data = JSON.parse(readJson);

/* GET page. */
router.get('/', (req, res) => {
  const { id, string, integer, float, start_date, end_date, boolean, checked_id, checked_string, checked_integer, checked_float, checked_date, checked_boolean } = req.query;
  let filterData = [];
  if (checked_id === "true" && id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        filterData.push(data[i]);
        //test
      }
    }
  }
  if (checked_string === "true" && string) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].string.toLowerCase() === string.toLowerCase()) {
        filterData.push(data[i]);
      }
    }
  }
  if (checked_integer === "true" && integer) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].integer == integer) {
        filterData.push(data[i]);
      }
    }
  }
  if (checked_float === "true" && float) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].float == float) {
        filterData.push(data[i]);
      }
    }
  }
  if (checked_date === "true" && start_date && end_date) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].date >= start_date && data[i].date <= end_date) {
        filterData.push(data[i]);
      }
    }
  }
  if (checked_boolean === "true" && boolean) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].boolean === parseInt(boolean)) {
        console.log(data[i].boolean, parseInt(boolean));
        filterData.push(data[i]);
      }
    }
  }
  if (!id && !string && !integer && !float && !start_date && !end_date && !boolean) {
    filterData = data;
  }
  res.render('pages/index', { data: filterData, id });
});

router.get('/add', function (req, res, next) {
  res.render('pages/add', { title: 'Add' });
});

router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  let dataId;

  for (let i = 0; i < data.length; i++) {
    if (Number(id) === data[i].id) {
      dataId = i;
    }

  }
  res.render('pages/edit', { data: data[dataId] });
});

/* END GET PAGE */

router.post('/add', function (req, res, next) {
  var { string, date } = req.body;
  const integer = Number(req.body.integer);
  const float = Number(req.body.float);
  const boolean = Number(req.body.boolean);
  // console.log(string, integer, float, date, boolean);
  var obj = {
    "id": data.length + 1, "string": string, "integer": integer, "float": float, "date": date, "boolean": boolean
  }
  data.push(obj);
  fs.writeFileSync('./data/data.json', JSON.stringify(data));
  res.redirect('/');
});

router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  var { string, date } = req.body;
  const integer = Number(req.body.integer);
  const float = Number(req.body.float);
  const boolean = Number(req.body.boolean);

  let dataId;
  for (let i = 0; i < data.length; i++) {
    if (Number(id) === data[i].id) {
      dataId = i;
    }
  }
  data[dataId].string = string;
  data[dataId].date = date;
  data[dataId].integer = integer;
  data[dataId].float = float;
  data[dataId].boolean = boolean;
  fs.writeFileSync('./data/data.json', JSON.stringify(data));
  res.redirect('/');
});

// router.get('/', (req, res) => {
//   const {checked_id} = req.body;
//   console.log(checked_id)
// })

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    if (Number(id) != data[i].id) {
      newData.push(data[i])
    }

  }
  data = newData;
  fs.writeFileSync('./data/data.json', JSON.stringify(data));
  console.log('Berhasil');
  res.redirect('/');
});


module.exports = router;
