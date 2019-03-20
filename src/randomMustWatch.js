function randomMustWatch (movies,res) {
    var response={};
    try {
        const awesome = movies.filter(movie => movie.metascore >= 70);
        const index=Math.round(Math.random()*(awesome.length-1));
        response=awesome[index];
        response.status=200;
    } catch (e) {
        console.error(e);
        response.status=500;
        response.message=e;
    }
    res.send(JSON.stringify(response));
}
module.exports=randomMustWatch;