function populate (movies,res) {
    var response={};
    try {
        response.total=movies.length;
        response.status=200;
    } catch (e) {
        console.error(e);
        response.status=500;
        response.message=e;
    }
    res.send(JSON.stringify(response));
}
module.exports=populate;