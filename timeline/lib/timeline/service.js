function TimelineService(app) {
    app.get('/', function(req,res) {
	res.render('home', {
	    locals: {
	    },
	    layout: false
	});
    });

    app.get('/timelines', function(req,res) {
	res.send(require('../../data/sample'));
    });
}

module.exports= TimelineService;