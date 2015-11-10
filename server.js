
'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let mdConverter = require('./routes/md-converter');

let app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index.jade'));

app.post('/md-processor', mdConverter);

let listener = app.listen(3000);

console.log('express is listening on port: ' + listener.address().port);
