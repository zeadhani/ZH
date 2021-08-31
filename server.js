
const http = require('http');
const fs = require ('fs') ;
const _ = require('lodash');

const server = http.createServer((req, res) => {
 

  res.setHeader('Content-Type', 'text/html');
  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'homepage.html';
      res.statusCode = 200 ;
      break;
    case '/about':
      path += 'aboutpage.html';
      res.statusCode = 200 ;
      break;
      case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
      
    case '/packages':
      path += 'packagespage.html';
      res.statusCode = 200 ;
      break;

    default:
      path += 'error404.html';
      res.statusCode = 404 ;
      break; 
      
  }
// res.write(' <p> gymshark </p>');
// res.end(); 

  fs.readFile(path , (err , data )=>{
    if(err){
    console.log(err);
    res.end();
  }
     else{ 
       
    res.end(data);
  }
});

});



server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});