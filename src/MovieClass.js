class Movie{
    constructor(object){
        this.link=object.link;
        this.metascore=object.metascore;
        this.synopsis=object.synopsis;
        this.title=object.title;
        this.year=object.year;
        this.poster=object.poster;
        this.id=object.id;
    }
    link(){return this.link}
    metascore(){return this.metascore}
    synopsis(){return this.synopsis}
    title(){return this.title}
    year(){return this.year}
    poster(){return this.poster()}
    id(){return this.id}
}
module.exports=Movie