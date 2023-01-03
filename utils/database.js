const mongodb = require("mongodb");
const Mongodb = mongodb.MongoClient;
//connection
let db;
const mongoconnect = (callback) => {
  Mongodb.connect(
    "mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/?retryWrites=true&w=majority"
  ).then((result) => {
      console.log("Connected");
      db=result.db();
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getdb=()=>{
  if(db){
    return db;
  }
  throw 'No Database Found'
}
exports.mongoconnect=mongoconnect;
exports.getdb=getdb; 
