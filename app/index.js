const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

module.exports = class Application {
    constructor() {
        this.configServer();
        this.configDB();
        this.setConfig();
        this.setRoutes();
    }

    configServer() {
        app.listen(3000, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Server run on port 3000...');
            }
        })
    }

    async configDB() {
        // global.Promise = mongoose.Promise; //// When we use this code, there is no need for async await
        await mongoose.connect('mongodb://127.0.0.1/db_test');
    }

    setConfig() {
        app.use(express.static(__dirname + '/public'))
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'resource/views') );
        app.use(expressLayouts);
        app.set('layout', 'master');
        app.set('layout extractScripts', true);
        app.set('layout extractStyles', true);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));
        app.use(session({
            secret : 'SecretKey',
            resave : true,
            saveUninitialized : true,
            store : mongoStore.create({
                mongoUrl : 'mongodb://127.0.0.1/db_test',
            }),
            cookie : {
                secure : false, // When we want to use https, it must be true
            }
        }));
        app.use(cookieParser());
        app.use(flash())
    }

    setRoutes() {
        app.use(require('./routes'));
    }
}