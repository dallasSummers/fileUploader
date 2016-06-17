
var $fileType = $('#fileInput'),
		videoData = [],
		counter = 0,
		playButtonObj = {},
		$videoList = $('#videosUploaded'),
		$uploader = $('#uploader'),
		$videoPlayer = $('#videoPlayer'),
		$errorText = $('#error_text');

//When the user selects a file
$fileType.on("change", function(){
	var videoFile = this.files[0];

//if the format is not mp4, display the error text
	if ($fileType.val().split(".").pop().toLowerCase() !== "mp4"){
		$errorText.css({"display":"block"});
	}
	// else if the format is correct, add the video to our videodata array
	else{
		videoData.push($fileType.get(0).files[0]);
		console.log(videoData[0])
		$errorText.css({"display":"none"});
		}
})

//When the user clicks the upload button
$uploader.on("click", function (event){
	counter += 1;
var formData = new FormData($('form')[0]);
//The user is only allowed to upload up to five videos. IF the upload more than five display this error
	if(counter >= 5){
		$errorText.replaceWith('<p style="background-color:#FF1214"><strong>Only five videos are allowed to be uploaded.</strong></p>');
	}
	if ($fileType.val().split(".").pop().toLowerCase() !== "mp4"){
		$errorText.css({"display":"block"});
	}
	else{
		$.ajax({
		    url: 'http://localhost:5000/api',
		    type: 'POST',
		    data: formData,
		    contentType: false,
		    processData: false
		}).done(function(res){
			$('#success_text').html('Successfully uploaded!');
		});

		//append the data to the list of videos in the html
		$videoList.append('<p><strong>Name:</strong> ' + videoData[0].name + ' <strong>Type:</strong> ' + videoData[0].type + ' <button id="playButton'+ counter +'" class="pure-button">PLAY</button>' + '<p>'+'<p>Please see the console for the uploaded file</p>');

		//attach a event to the playButton that is attached to each uploaded video.
		$("#playButton"+counter)[0].addEventListener("click", videoRetriever)

	}
});

function videoRetriever(){
	$.ajax({
		    url: 'http://localhost:5000/api',
		    type: 'get',

		}).done(function(res){
			console.log('RES', res)
		});
    // console.log('clicked', videoData[0]);

    // 	$videoPlayer.src = url;
    // 	$videoPlayer.play;
		


}















