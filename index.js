const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // If the request is for the root URL, return the search form
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style> 
input[type=button], input[type=submit], input[type=reset] {
  background-color: #04AA6D;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}
input[type=text] {
  font-size: 12px;
  padding: 16px 24px;
  text-decoration: none;
  margin: 4px 2px;
}
</style>
</head>
<body>
<h2>Pincode Check for Kotak811</h2>
<form method="post" action="/">
<input type="text" name="searchValue" placeholder="Enter Pincode"/>
<input type="submit" value="Search">
</form>
</body>
</html>
`);
  } else if (req.method === 'POST' && req.url === '/') {
    // If the request is a POST request to the root URL, search for the value in the JSON array
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Parse the search value from the request body
      const searchValue = body.split('=')[1];
      console.log(searchValue);

      // Load the JSON data from an external file
      fs.readFile('data.json', (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.end('Internal Server Error');
          return;
        }

        const jsonData = JSON.parse(data);
        if (Array.isArray(jsonData)) {
          const result = jsonData.includes(searchValue)
          if (result) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style> 
h1{
color: green;
}
</style>
</head>
<body>
<h1>Congratulations, Your Pincode is Serviceable</h1>
<p>Kotak811 Pincode Checker v1 :: Powered by Infused Affilaite</p>
</body>
</html>
`);
          }else{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style> 
h1{
color: red;
}
</style>
</head>
<body>
<h1>Opps, Your Pincode is Not Serviceable, We Will Available Soon To Your Pincode</h1>
<p>Kotak811 Pincode Checker v1 :: Powered by Infused Affilaite</p>
</body>
</html>
`);
          }
        }else{
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(`Not Valid Array`);
        }
      });
    });
  } else {
    // If the request is for any other URL, return a 404 error
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 - Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
