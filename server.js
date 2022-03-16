const express = require('express');
const app = express();
const port = 3000;

const request = require('request');

app.get('/', function (req, res) {
  res.send('Hello World, Holla Mundo, Viswa Avibadana :) !!')
});

app.get('/movies', (req, res) => {

  var MOVIE_NAME = req.query.title;

  request('https://api.themoviedb.org/3/search/movie?api_key=41a6894ca93cb1c78657d9e799e164de&query=' + MOVIE_NAME, { json: true }, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred and handle it

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    var movies = limitNoOfMovies(body);

    res.send(movies);
  });
});

app.get('/movies/:movie_id', (req, res) => {
  var MOVIE_ID = req.params['movie_id'];
  console.log('Looking for Movie ID: ' + MOVIE_ID);
  request('https://api.themoviedb.org/3/movie/' + MOVIE_ID + '?api_key=41a6894ca93cb1c78657d9e799e164de', { json: true }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred and handle it
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.send(body);
  });
});

app.get('/shows', (req, res) => {

  var SHOW_NAME = req.query.name;

  request('https://api.themoviedb.org/3/search/tv?api_key=41a6894ca93cb1c78657d9e799e164de&query=' + SHOW_NAME, { json: true }, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred and handle it

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    var movies = limitNoOfMovies(body);

    res.send(movies);
  });
});

app.get('/shows/:show_id', (req, res) => {

  var SHOW_ID = req.params['show_id'];

  console.log('Looking for Show ID: ' + SHOW_ID);

  request('https://api.themoviedb.org/3/tv/' + SHOW_ID + '?api_key=41a6894ca93cb1c78657d9e799e164de', { json: true }, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred and handle it

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    res.send(body)
  });
});


app.listen(port, () => {
  console.log(`Listening on port ${port} ...`)
})

function limitNoOfMovies(body) {

  var resultsList = body.results;
  var limitedResults = [];

  for (var i = 0; i < 10 && i < resultsList.length; i++) {
    limitedResults.push(resultsList[i]);
  }

  return limitedResults;
}