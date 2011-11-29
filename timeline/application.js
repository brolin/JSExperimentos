/**
 * Module dependencies.
 */

var express = require('express');
var stylus = require('stylus');
var form = require('connect-form');
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
    this.set('view options', { layout: 'layouts/application' })
    this.use(express.bodyParser());
    this.use(express.logger());
    this.use(express.methodOverride());
    this.use(express.cookieParser());
    this.use(express.session({secret: 'bugswarm Eah4tfzGAKhr'}));
    this.use(stylus.middleware({
	src: __dirname + '/views'
	, dest: __dirname + '/public'
	, compile: compile
    }));
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

// We only use the first 'info' flash
// Other flash types are ignored
function getFlash(req) {
    var flash= req.flash('info');
    return flash.length > 0 ? flash.shift() : null;
}

try {
    // Order is important here!
    // Make sure AccountService is topmost
    require('./lib/timeline/service')(app);
} catch(e) {
    console.log(JSON.stringify(e));
    // email error
}

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(8080);
  console.log("Express server listening on port %d", app.address().port)
}
