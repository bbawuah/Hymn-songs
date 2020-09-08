const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Adventist hymnal',
    message: "Lighten someone's day with this application!"
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Adventist hymnal',
    message: "Lighten someone's day with this application!"
  })
})

app.get('/privacy', (req, res) => {
  res.render('privacy', {
    title: 'Adventist hymnal',
    message: "Lighten someone's day with this application!"
  })
})




app.listen(port, () => console.log('App is listening to port 3000'))