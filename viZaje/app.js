var fs = require('fs');
var parser = require('xml2json');

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

var xml = fs.readFileSync('mail.xml', 'utf8');
var json = parser.toJson(xml, {object:true}); //returns an string containing the json structure by default

// console.log(json);

function transform(email) {
    var date= function() {
	var day= email.received.date.match(/(\d{4})(\d{2})(\d{2})/);
	var time= email.received.time.split(':');
	return new Date(day[1],day[2],day[3],time[0],time[1],time[2]);
    }();

    try {
	var obj= {
	    received: date,
	    fromName: email.from.name,
	    fromEmail: email.from.email,
	    messageid: email.messageid,
	    inreplyto: email.inreplyto,
	    subject: email.subject,
	    text: email.text
	};

	if(email.to) {
	    obj.toName= email.to.name;
	    obj.toEmail= email.to.email;
	}
    } catch(e) {
	console.log(email);
	console.log("\n\n\n\n");
    }

    return obj;
}

var messages= json.m2x.message.forEach(function(email) {
    var data= new Email(transform(email));
    data.save(function(err, _email) {
    	console.log(_email);
    });
});

// process.exit()