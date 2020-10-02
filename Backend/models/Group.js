const mongoose = require('mongoose');

var groupSchema  = new mongoose.Schema({
	name : String,
	admin : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
	members : [{
		// id : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
		name : String,
		email : String,
		rollno : String,
	}],
	department : String,
	comments : [{
		author : String,
		text : String,
		time : { type : Date, default: Date.now },
	}],
	proposals : [{
		title : String,
		specialization : String,
		details : String,
		agency : String,
		method : String,
		result : String,
		requirements : String,
		attachPrints : String, 
		approval : {
			admin : { type :Boolean,default:false },
			hod : { type :Boolean,default:false },
		},
		applied : {
			type : Date,
			default: Date.now 
		},
	}],
	dueDate : {type : Date},
	acadYear : String,
	guide : {
		name : String,
		email : String,
	}
});

var Group = mongoose.model('Group',groupSchema);
module.exports  = Group