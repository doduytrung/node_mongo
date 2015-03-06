var mongo = require("mongodb");
var host = "127.0.0.1";
var port = 27017;//mongo.Connection.DEFAULT_PORT;
 
 
function getDoc(name, callback) { 
 
	var db = new mongo.Db("mytest", new mongo.Server(host, port, {}),{safe: true});	
	db.open(function(error){
		console.log("We are connected! " + host + ":" + port);
 
		db.collection("documents", function(error, collection){
			console.log("We have the collection");
			collection.find({'a':name}, function(error, cursor){
				cursor.toArray(function(error, documents){
					if (documents.length == 0) {
						callback(false);
					} else {
						callback(documents[0]);
					}
				});
			});
		});
 
	});
}
 
getDoc(1, function(doc){
	if (!doc) {
		console.log("No user found with name 1");
	} else {
		console.log("We have a doc: ", doc);
	}
});