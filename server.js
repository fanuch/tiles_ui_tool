const express = require('express')
const bodyParser = require('body-parser');
const eol = require('eol');
const app = express()
var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, '.git/logs/HEAD');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')




app.get('/', function (req, res) {
	// rMake the array empty
	var git_array = [];
	// Import the Git log
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
    	// Turn the commit lines into json objects
    	let lines = eol.split(data)
			lines.forEach(function(line) {
				if (line.indexOf("commit") !== -1)
				{
					git_array.push(line.substring(line.indexOf(":") + 2))
				}
		})
		// Send to web page
		res.render('index', {
	  	git: git_array,
	  })
    } else {
          console.log('ERROR');
    }
})
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})