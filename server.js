var http = require('http'),
fs = require('fs'), 
url = require('url'),
port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
var parsedUrl = url.parse(request.url);

    if (parsedUrl.pathname == '/listings')
    {
        let raw = fs.readFileSync('listings.json');
        let listingData = JSON.parse(raw);
        response.end(JSON.stringify(listingData));
    }
    else
    {
        response.writeHead(404);
        response.write('Bad gateway error');
        response.end();
    }
};

fs.readFile('listings.json', 'utf8', function(err, data) {


    //Check for errors
    if (err) throw err;

    //Save the sate in the listingData variable already defined
    listingData = data;

    //Creates the server
    var createServer = http.createServer(requestHandler);
  
    //Start the server
    createServer.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
    });


});
