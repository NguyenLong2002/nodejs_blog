const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes');

const db = require('./config/db')
//connet to database
db.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//HTTP logger
// app.use(morgan('combined'))

//Template engine
  app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers:{
            sum: (a,b) => a+b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
