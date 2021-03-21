require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/picoftheday', (req, res) => {

    async function getPicOfTheDay() { 
        axios.get("https://api.nasa.gov/planetary/apod?", {
            params: {
                api_key: process.env.API_KEY,
            },
        }).then((response) => {
            res.render('picoftheday', { 
                url: response.data.hdurl,
                title: response.data.title,
                description: response.data.explanation,
                date: response.data.date,
                author: response.data.copyright
            });
        }).catch((err) => {
            console.log(err);
        })
    };

    getPicOfTheDay();
    
});

app.listen(3000);