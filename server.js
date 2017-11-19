

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('applicantapp', ['users'] );
var ReactEngine = require('express-react-engine');

var app = express();

var logger = function(req, res, next)  {
  console.log("logging");
  next();
}

app.use(logger);

app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'src'));
// app.engine('jsx', ReactEngine());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));



// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
});

//ExpressValidator new Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';

    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


var users = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com'
  },
  {
    id: 2,
    first_name: 'Johnny',
    last_name: 'Doey',
    email: 'johnydoey@gmail.com'
  }
]

//change this to contact page
app.get('/', function(req, res) {
  db.users.find(function(err, docs) {
    console.log(docs);
    // res.render('index',{
    //   title: 'Customers',
    //   users: docs,
    //
    // });
  })



});

app.post('/users/add', function(req, res) {
  console.log("Detected post request");

  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    // res.render('index',{
    //   title: 'Customers',
    //   users: users,
    //   errors: errors
    // });
    console.log("Errors");

  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,

    }
    db.users.insert(newUser, function(err, result) {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    })
    console.log("Success");
    db.users.find(function(err, docs) {
      console.log(docs);

    })

  }


  console.log(req.body.first_name);
});

app.listen(3000, function() {
  console.log('server stared on port 3000')
})
