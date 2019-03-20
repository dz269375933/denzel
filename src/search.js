function search (movies,limit,metascore,res) {
    var response={};
    var results=[];
    response.limit=limit;
    try {
        const awesome = movies.filter(movie => movie.metascore >= metascore);
        if(awesome.length<=limit){
            response.results=awesome;
            response.total=awesome.length;
        }else{
            for(let i=0;i<limit;i++){
                results.push(awesome[i]);
            }
            response.results=results;
            response.total=limit;
        }
        response.status=200;
    } catch (e) {
        console.error(e);
        response.status=500;
        response.message=e;
    }
    res.send(JSON.stringify(response));
}
module.exports=search;