var express = require('express');
var path = require('path');

var app = express();

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var data={count:0};
app.get('/', function (req, res) {
    data.count++;
    res.render('my_first_ejs', data);
});

app.listen(3000, function() {
    console.log('Server On!');
});