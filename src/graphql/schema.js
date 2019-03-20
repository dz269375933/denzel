const {buildSchema} = require('graphql');
var schema = buildSchema(`
    type Query {
    movie(movieId:String):Movie
    movies:[Movie]
    populate:Populate
    search(limit:Int!,metascore:Int!):Search
    save(date:String,review:String,movieId:String):Save
    review(movieId:String!):[Review]
    }
    type Review{
    date:String
    review:String
    }
    type Save{
    _id:String
    }
    type Movie {
    link: String
    metascore: Int
    synopsis: String
    title: String
    year: Int
    poster:String
    id:ID
    }
    type Populate{
    total:Int
    }
    type Search{
    limit:Int
    total:Int
    results:[Movie]
    }
`);
module.exports = schema