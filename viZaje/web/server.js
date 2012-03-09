var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/viZaje');
var express = require('express');
var stylus = require('stylus');
var app = module.exports = express.createServer();


// Configuration
function compile(str, path) {
    return stylus(str)
	.set('filename', path)
	// .set('compress', true);
}


app.configure(function(){
    this.set('views', __dirname + '/views');
    this.set('view engine', 'jade');
    this.set('view options', { layout: 'layout' })
    this.use(express.bodyParser());
    this.use(express.logger());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({secret: 'Eah4tfzGAKhr'}));
    this.use(stylus.middleware({
	src: __dirname + '/views'
	, dest: __dirname + '/public'
	, compile: compile
    }));
    this.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000}));
    this.use(express.static(__dirname + '/public'));
    // Keep this as last one
    this.use(this.router);
});


app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
	res.render('index', {
	});
});

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(8000);
  console.log("Express server listening on port %d", app.address().port)
}
