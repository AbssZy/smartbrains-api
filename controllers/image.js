const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'aabb20c0e9944834ac73930271aec71e'
    });

const handleApiCall = (req, res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleEntry = (req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleEntry: handleEntry,
    handleApiCall: handleApiCall
}