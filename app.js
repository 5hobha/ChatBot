// /**
//  * App Server File.
//  */

const express = require('express'); // Express to run server
const app = express();
const bodyParser = require('body-parser'); // Body Parser
const _ = require('lodash'); //lodash
//const mongoose = require("mongoose"); // Mongoose for mongodb;
const fs = require('fs');
const cookieParser = require('cookie-parser'); // Cookie parser
const flash = require('connect-flash');
const path = require('path');

const passport = require('passport') //Passport login
var expressSession = require('express-session');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3092');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var config = require('./config/config');

app.use(cookieParser()); // Initialize cookie parser
app.use(passport.initialize()); // Initialize passport
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());

// required for passport
app.use(expressSession({
    secret: 'mySecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport
//var initPassport = require('./passport/init');
//initPassport(passport);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'dist/ChatBoatNew')));
app.use('/', express.static(path.join(__dirname, 'dist/ChatBoatNew')));


var port = config.port;
console.log(port);
var router = express.Router();
app.use('/api/v1', router);

server.listen(port, () => {
    console.log("ebfgjhdgregregfregf")
    //Enable jsonp
    var walk = function(path) {

        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    require(newPath);
                }
            } else if (stat.isDirectory()) {
                walk(newPath);
            }

        });

         
    };
    require('./app/routes')(server, io, router);
     //     server.get('/check', function(req, res) {
     //     console.log("ebfgjhdgregregfregf")
     //     res.send("responseffgtrytryhtuytu")
     // });
    // //including models
    //var models_path = __dirname + '/app/models';
    //walk(models_path);

    // // establish connection to mongodb
    // mongoose.Promise = global.Promise; // Mongoose
    // mongoose.connect(config.db, {
    //     useNewUrlParser: true
    // }); // Connect to mongo

    // var db = mongoose.connection; // Mongoose connection check

    // db.on('error', (err) => { // Mongoose connection error
    //     console.log('Mongoose error', err);
    //     process.exit(1);
    // });

    // db.once('open', () => {
    //     //require('./config/passport')(passport);
    //     require('./app/routes/users')(app, config.db, passport, router);
        
    //     console.log('db connected and Server is listening on port' + port); // Run server
    // });

});

process.on('uncaughtException', (err) => {
    console.error("<<<<<-----     error in      ----->>>", err);
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'help@silverpush.co',
    //         pass: 'chill123'
    //     }
    // });

    // var mailOptions = {
    //     from: 'help@silverpush.co',
    //     to: 'rohit.shukla@silverpush.co,nidhi@silverpush.co,vishal.prasad@silverpush.co,shivangi@silverpush.co,shobha@silverpush.co',
    //     subject: 'Error in poll prism',
    //     text: err.stack
    // };
    // //console.error("errrr---->>", errrr);
    // transporter.sendMail(mailOptions, function(error, info) {
    //     if (error) {
    //         console.log("error in emil sent---", err);
    //     } else {
    //         console.log('Email sent for Error');
    //     }
    // });
});

module.exports = app;
