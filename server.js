const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'Toby',
		password: '0718',
		database: 'smart-brain'
	}
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => { response.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (request, response) => { register.handleRegister(request, response, db, bcrypt)})
app.get('/profile/:id', (request, response) => { profile.handleProfileGet(request, response, db) })
app.put('/image', (request, response) => { image.handleImage(request, response, db)})
app.post('/imageurl', (request, response) => { image.handleApiCall(request, response)})

app.listen(3001, () => {
	console.log('Helloooo world! App is running on PORT 3001');
});



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



/*
/ --> res = this is working
/signin  --> POST = success/fail
/register  --> POST = user
/profile/:userId  --> GET = user
/image  --> PUT  --> user
*/