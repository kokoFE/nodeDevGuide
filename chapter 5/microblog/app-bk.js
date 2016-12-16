
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');``
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
var users = {
  'koko': {
    name: 'kokoFE',
    website: 'http://www.byvoid.com'
  }
};

app.get('/', routes.index);
app.get('/hello', routes.hello);
// app.get('/', routes.index);
// app.get('/u/:user', routes.user);
// app.post('/post', routes.post);
// app.get('/reg', routes.reg);
// app.post('/reg', routes.doReg);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout);
app.all('/user/:username', function(req, res, next){
  if (users[req.params.username]) {
    next();
  } else {
    next(new Error(req.params.username + 'does not exist.'));
  }
});
app.get('/user/:username', function(req, res){
  // res.send('user: ' + req.params.username);
  res.send(JSON.stringify(users[req.params.username]));
});
app.put('/user/:useranme', function(req, res){
  res.send('Done');
})
app.get('/list', function(req, res){
  res.render('list', {
    title: 'List',
    items: [1991, 'byvoid', 'express', 'Node.js']
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
