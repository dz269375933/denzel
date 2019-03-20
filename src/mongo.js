const MongoClient = require('mongodb').MongoClient;
const USER_DATA=require('./data/data');
const uri = "mongodb+srv://"+USER_DATA.username+":"+USER_DATA.pwd+"@dz-8my60.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var collection;
client.connect(err => {
    collection = client.db("test").collection("denzel");

});

function exit(){
    client.close();
}
insertOne=(comment)=>new Promise((resolve,reject)=>{
    collection.insertOne(comment,async (err,res)=>{
        if(err) {
            response.send(err);
            throw err;
        }
        resolve(res.ops[0]._id);
    })
});
findById=(movieId)=>new Promise((resolve,reject)=>{
    collection.find({"movieId":movieId}).toArray((error,docs)=>{
       resolve(docs);
    });
});
module.exports={
    exit:exit,
    insertOne:async (comment)=>{
        return await insertOne(comment);
    },
    findById:async (movieId)=>{
        return await findById(movieId);
    }
}

