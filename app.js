const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true });

const port = 8000;

// app.use(bodyparser.json())

// Define mongoose schema
let contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});


let Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'))
app.use(express.urlencoded());



// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'pug') //set the template engine as a pug
app.set('views', path.join(__dirname, 'views')) //set the views directory


//ENDPOINTS
app.get('/', (req, res) => {
    const params = { };
    res.status(200).render('home.pug', params)
});

app.get('/contact', (req, res) => {
    const params = { };
    res.status(200).render('contact.pug', params)
});

app.post('/contact', (req, res) => {
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('This data has been successfully saved in database')
    }).catch(()=>{
        res.status(400).res.send('The data was not saved into the database please try again!!')
    })    
    // res.status(200).render('contact.pug')
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The Server is running on the port number: ${port}`);
});