var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("MarvinBot");
  var stat1 = {
    _id: "$role",
    count: {$sum: 1}
   
  };
  dbo.collection("users").find().group(stat1).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});