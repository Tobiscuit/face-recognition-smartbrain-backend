const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '6bf7ae5ca4fd495092f0926c3d91073f'
})

const handleApiCall = (request, response) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
	.then(data => {
		response.json(data);
	})
	.catch(err => response.status(400).json('Unable to work with API'))
}

const handleImage = (request, response, db) => {
	const { id } = request.body;
  	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		response.json(entries[0]);
  	})
  	.catch(err => response.status(400).json('Unable to retrieve entries'))
}

module.exports = {
	handleImage, handleApiCall
}