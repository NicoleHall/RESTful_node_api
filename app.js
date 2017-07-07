var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');

var app = express();
var port = 3000;
var db = monk('localhost/gameslocker');
var games = db.get('games');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// var store = [];

app.get('/api/games', function(req, res, next){
  games.find({})
  .then(function(games){
    res.json(games);
  })
  .catch(function(err){
    res.json(err);
  })
})

//the insert funtion that comes from monk returns the object that
//was insterted into the db so that's why the .then and the .catch
//methods take a function that has "game" singular as the argument.
//it could also just be called "object"
app.post('/api/games', function(req, res, next){
  games.insert(req.body)
  .then(function(game){
    res.json(game);
  })
  .catch(function(err){
    res.json(err);
  })
});

app.delete('/api/games/:id', function(req, res, next){
  var id = req.params.id;
  games.findOneAndDelete({_id: id})
  .then(function(){
    res.json({status: "deleted"})
  })
  .catch(function(err){
    res.json(err)
  })
})

app.listen(port, function(){
  console.log('api listening on port ' + port);
})
