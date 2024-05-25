/**
 * Require Modules
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

const server = app.listen(3003, function(){
    console.log("Listening to Port 3003");
});
const io = require('socket.io')(server, { path: '/assignments/ebg/socket.io' });

/* Socket Event Listener */
let count = 0;
io.on('connection', function(socket){
    /* Whenever a client establishes a connection, server emits updated count */
    socket.emit('updated_count', {data: count});
    
    socket.on('update_count', function(req){
        count++;
        io.emit('updated_count', {data: count});
    });

    socket.on('reset', function(req){
        count = 0;
        io.emit('updated_count', {data: count});
    });
});
/**
 * Routes
 */
app.get('/assignments/ebg/', function(req, res){
    res.render('index', {user_data: "Hey"});
});

app.post('/assignments/ebg/users', function(req, res){
    res.render('users', {user: req.body});
});
