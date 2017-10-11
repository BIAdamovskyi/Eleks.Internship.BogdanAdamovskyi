import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';



import { serverPort } from '../config/config.json';

import * as db from './utils/DataBaseUtils';
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./models/User'); // get our mongoose model
var Video   = require('./models/Video'); // get our mongoose model

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();
app.set('superSecret', '1111'); // secret variable

// Using bodyParser middleware
// use body parser so we can get info from POST and/or URL parameters!!!!!!!!!!!!!!!!!!!!!!!! NB NB NB
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', function(req, res) {

	// create a sample user
	var adam = new User({ 
		name: 'Bogdan Adamovskyi', 
		password: 'admin'/*,
		admin: true */
	});
	adam.save(function(err) {
		if (err) res.json({success:false,message:err.message});

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/register
apiRoutes.post('/register', function(req, res) {
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) res.json({success: false, message: " Find Error"});

		if (user) {
			res.json({ success: false, message: 'Registration failed. User already exist.' });
		} else if (!user) {
			
			if (false) { //add not valid pass
				res.json({ success: false, message: 'Registration failed. Wrong password.' });
			} else {
				console.log(req.body.name+" "+req.body.password)
				var newUser = new User({ 
		name: req.body.name, 
		password: req.body.password
	});
	newUser.save(function(err) {
		if (err)  res.json({success: false, message: "Save Error "+err.message+" "+ newUser });

		console.log('User saved successfully');
		res.json({ success: true });
	});
			}		

		}

	});

	});

// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found. '+req.body.name });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.post('/video', function(req,res){
	var newMovie=new Video({
	name     : req.body.name,
    description : req.body.description,
    genre     : req.body.genre,
    infoUplodedByUser : req.body.infoUplodedByUser,
    link : req.body.link,
    dateofUpload : req.body.dateofUpload
	});
	newMovie.save(function(err) {
		if (err)  res.json({success: false, message: "Save Error "+err.message});

		console.log('Video saved successfully');
		res.json({ success: true });
	});	
});


/*apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});*/

app.use('/api', apiRoutes);



// =================================================================
// start the server ================================================
// =================================================================

/*
// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});
*/
const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
