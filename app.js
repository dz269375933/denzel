const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP=require('express-graphql');
const populate = require('./src/populate');
const imdb = require('./src/imdb');
const randomMustWatch = require('./src/randomMustWatch');
const findMovieById = require('./src/findMovieById');
const search = require('./src/search');
const mongo = require('./src/mongo');
const Movie=require('./src/MovieClass');
const DENZEL_IMDB_ID = 'nm0000243';
const mySchema=require("./src/graphql/schema");
var movies = [];
var app = express();
const listenPath = "/movies";
const listenAddress = "http://localhost:9292";

var root = {
    review:async ({movieId})=>{
        const result=await mongo.findById(movieId);
        return result;
    },
    movie: ({movieId}) => {
        if(movieId==null){
            const awesome=movies.filter(movie=>movie.metascore>=70);
            console.log(awesome);
            const index=Math.round(Math.random()*(awesome.length-1));
            return new Movie(awesome[index]);
        }else{
            let i=0;
            for(let i=0;i<movies.length;i++){
                if(movies[i].id==movieId)return new Movie(movies[i]);
            }
        }

    },
    movies:()=>{
        var response=[];
        for(let i=0;i<movies.length;i++){
            response.push(new Movie(movies[i]));
        }
        return response;
    },
    populate:()=>{
        return {total:movies.length};
    },
    search:({limit,metascore})=>{
        const awesome=movies.filter(movie=>movie.metascore>=metascore);
        var response={};
        response.limit=limit;
        var results=[];
        for(let i=0;i<limit;i++){
            if(awesome[i]==null)break;
            results.push(new Movie(awesome[i]));
        }
        response.results=results;
        response.total=results.length;
        return response;
    },
    save:async ({date,review,movieId})=>{
        var comment={};
        comment.movieId = movieId;
        comment.data = date;
        comment.review = review;
        const _id=await mongo.insertOne(comment);
        return {_id:_id};
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(9292, async function () {
    movies = await imdb(DENZEL_IMDB_ID);

    console.log("nodejs listen 9292 …… ");
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.get(listenPath, (req, res) => {
    randomMustWatch(movies, res);
});
app.get(listenPath + '/populate', (req, res) => {
    populate(movies, res);
});
app.get(listenPath + '/search', (req, res) => {
    search(movies, req.query.limit, req.query.metascore, res);
});
app.get(listenPath + '/:id', (req, res) => {
    findMovieById(movies, req.params.id, res);
});
app.post(listenPath + '/:id', async (req, res) => {
    var comment = {};
    comment.movieId = req.params.id;
    comment.date = req.body.date;
    comment.review = req.body.review;
    const _id=await mongo.insertOne(comment);
    var response={};
    if(_id!=null){
        response._id=_id;
        response.status=200;
    }else{
        response.status=500;
    }
    res.send(response);
});
app.post('/graphql', graphqlHTTP({
    schema: mySchema,
    rootValue: root,
    graphiql: true
}));

app.get('/graphql', graphqlHTTP({
    schema: mySchema,
    rootValue: root,
    graphiql: true
}));

