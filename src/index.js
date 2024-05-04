const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/sortmiddleware');


const app = express();
const port = 3000;
const route = require('./routes');

const db = require('./config/db');
const sortMiddleware = require('./app/middlewares/sortmiddleware');
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

app.use(sortMiddleware);
//HTTP logger
// app.use(morgan('combined'))

//Template engine
  app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers:{
            sum: (a,b) => a+b,
            sortable: (field, sort)=>{
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default:'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short'
                }
                const types = {
                    default:'desc',
                    asc: 'desc',
                    desc:'asc',
                }
                const icon = icons[sortType];
                const type = types[sortType]
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i> </a>`
            }
        },

    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
