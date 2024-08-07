const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwtDecode = require('jwt-decode');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();
// dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const route = require('./routes');
const db = require('./config/db');

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/header-layout'); // set custom default layout

app.use(cookieParser());
// static files
app.use(express.static(path.join(__dirname, 'public')));

// connect to DB
db.connect();

// middleware: parse body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// middleware: override with POST having ?_method=DELETE/PUT
app.use(methodOverride('_method'));

// middleware: cors
app.use(cors());

// Routes init
route(app);

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = { app, server };
