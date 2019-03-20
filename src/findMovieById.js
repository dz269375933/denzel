function findMovieById(movies, movieId, res) {
    var response = {};
    try {
        for (i in movies) {
            if (movies[i].id == movieId) {
                response = movies[i];
                break;
            }
        }
        if (response.id == null) {
            response.status = 200;
            response.message = "Sorry,can not find the movie id.";
        } else {
            response.status = 200;
        }
    } catch (e) {
        console.error(e);
        response.status = 500;
        response.message = e;
    }
    res.send(JSON.stringify(response));
}

module.exports = findMovieById;