function TimelineService(app) {
    app.get('/', function(req,res) {
	res.render('home', {
	    locals: {
	    }
	});
    });

    app.get('/timelines', function(req,res) {
	res.send(require('../../data/sample'));
    });
}

module.exports= TimelineService;