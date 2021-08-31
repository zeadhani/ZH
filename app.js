const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
var axios = require("axios").default;
const blogRoutes = require('./routes/blogRoutes');



// express app

const app = express();
var options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/find',
  params: {
    q: 'Cairo,eg',
    lat: '0',
    lon: '0',
    callback: '',
    id: '2172797',
    lang: 'null',
    units: '"metric" or "imperial"',
    mode: 'xml, html'
  },
  headers: {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': '5f2f045336msh195b39098018928p1cee02jsn97c551d132ac'
  }
};
const dburi='mongodb+srv://zeadhani:1234560@cluster0.dnpcx.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');


// listen for requests
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});


app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
  //res.send('<p>home page</p>');
  res.render('homepage', { title: ' home page '});
}); 


app.get('/api' , (req,res)=>{
  axios.request(options).then(function (response) {
    console.log(response.data.list[0].main.temp);
    res.render('api',{title:'weather', weather: response.data.list[0] }) ;
  }).catch(function (error) {
    console.error(error);
  });
 
})


app.get('/feedbacks', (req, res) => {
  
  res.redirect('/blogs') 
});


app.get('/about', (req, res) => {
  //res.send('<p>about page </p>');
  //res.sendFile('./views/aboutpage.html', { root: __dirname });
  res.render('aboutpage', { title: ' about us ' });
}); 

app.get('/packages', (req, res) => {
  //res.send('<p>available packages</p>');
  //res.sendFile('./views/packagespage.html', { root: __dirname });
  res.render('packagespage', { title: 'packages ' });
}); 

app.get('/sign-up',(req,res)=>{
res.render('create', { title: 'sign up' }); 

});
app.get('/details',(req,res)=>{
  res.render('details', { title: ' details' }); 
  
  });

 

   



  app.use((req, res) => {
    //res.status(404).sendFile('./views/error404.html', { root: __dirname });
    res.status(404).render('error404', { title: ' error ' }); 
  });