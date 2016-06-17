var express = require('express'),
app = express(),
fs = require('fs'),
multer = require('multer'),
uploadPath = __dirname + '/../videos',
videoFile = {},
upload = multer();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/api', upload.single('videoFile'), function (req, res) {
	videoFile.name = req.file.originalname;
	videoFile.encoding = req.file.encoding;
	videoFile.size = req.file.size;
	videoFile.type = req.file.mimetype;
 	console.log("GOT IT", videoFile);
 	res.sendStatus(200)
 	fs.appendFile("uploadPath", videoFile);

});

app.get('/api', function(req, res){
	var stream = fs.createReadStream('uploadPath.js')

	res.send(stream)
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
