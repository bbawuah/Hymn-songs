const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();

const port = 3000 || process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'My app'
  })
})





app.listen(port, () => console.log('App is listening to port 3000'))