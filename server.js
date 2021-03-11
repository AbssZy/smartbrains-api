const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    version: '13.0',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{res.send("It is working!!!!")});
app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.put('/image',(req, res)=>{image.handleEntry(req, res, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)});
app.post('/imageurl',(req, res)=>{image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000,() =>{
    console.log(`App is running on port ${process.env.PORT}`);
})
