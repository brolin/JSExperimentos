var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/viZaje');

var Schema= mongoose.Schema,
    ObjectId= Schema.ObjectId;

var EmailModel= new Schema({
    received: { type: Date, index: true },
    fromName: { type: String, index: true },
    fromEmail: { type: String, index: true },
    toName: { type: String, index: true }, 
    toEmail: { type: String, index: true }, 
    messageid: { type: String, index: true },
    inreplyto: { type: String, index: true },
    subject: { type: String, index: true },
    text: { type: String, index: true }
});
mongoose.model('Email', EmailModel);

var Email= db.model('Email');

var months= ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function getByMonth() {
    var result= {};
    var subjects= {};
    var tokenCount= 0;
    var from= {};
    Email.where('received')
	.gt(new Date(2009,1,1))
	.lte(new Date(Date.now()))
	.run(function(err, emails) {
	    if(err) {
		throw(err);
	    }

	    emails.forEach(function(e) {
		var year= e.received.getFullYear();
		var month= e.received.getMonth();
		if(!result[year]) { result[year]= {} }
		if(!result[year][month]) { result[year][month]= [] }
		result[year][month].push(e);

		try {
		    if(!from[e.fromEmail]) {
			from[e.fromEmail]= 0;
		    }
		    from[e.fromEmail]++;

		    // e.subject.split(" ").forEach(function(token) {
		    // 	if(!subjects[token]) { 
		    // 	    tokenCount++;
		    // 	    subjects[token]=0 
		    // 	}
		    // 	subjects[token]++;
		    // });

		    // e.text.split(" ").forEach(function(token) {
		    // 	if(!subjects[token]) { 
		    // 	    tokenCount++;
		    // 	    subjects[token]=0 
		    // 	}
		    // 	subjects[token]++;
		    // });
		} catch(e) {
		    console.log("\n\n\n========== ERROR ============")
		    console.log(e);
		    console.log("\n\n\n========== ERROR ============")
		}
	    })

	    // console.log(subjects);
	    // console.log("\n\ntokenCount");
	    // console.log(tokenCount);

	    console.log(from);

	    // for(year in result) {
	    // 	console.log(year);
	    // 	console.log("=====");
	    // 	for(month in result[year]) {
	    // 	    console.log(months[month]);
	    // 	    console.log(result[year][month].length);
	    // 	}
	    // 	console.log();
	    // }
	});
}

getByMonth();

// db.disconnect();