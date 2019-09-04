var myPlayer = videojs('currentVideo', {
    fluid: true,
    controls: true,
    autoplay: false,
    preload: 'auto',
    controlBar: {
        pictureInPictureToggle: false,
        fullscreenToggle: true,
        volumePanel: {
            inline: false
        }
    },
    playbackRates: [.5, 1, 1.5, 2, 2.5]
}, function() {
    // var controlBar,
    // newElement = document.createElement('div'),
    // newLink = document.createElement('a'),
    // newImage = document.createElement('img');
    // // Assign id and classes to div for icon
    // newElement.id = 'downloadButton';
    // newElement.className = 'downloadStyle vjs-control';
    // // Assign properties to elements and assign to parents
    // newImage.setAttribute('src','http://solutions.brightcove.com/bcls/brightcove-player/download-video/file-download.png');
    // newLink.setAttribute('href','#');
    // newLink.appendChild(newImage);
    // newElement.appendChild(newLink);
    // // Get control bar and insert before elements
    // // Remember that getElementsByClassName() returns an array
    // controlBar = document.getElementsByClassName('vjs-control-bar')[0];
    // // Change the class name here to move the icon in the controlBar
    // insertBeforeNode = document.getElementsByClassName('vjs-fullscreen-control')[0];
    // // Insert the icon div in proper location
    // controlBar.insertBefore(newElement,insertBeforeNode);
    // //controlBar.appendChild(newElement);

});

myPlayer.ready(function() {

    this.hotkeys({
        volumeStep: 0.1,
        seekStep: 10,
        enableModifiersForNumbers: false,
    });

    this.poster('/media/tvsensei_logo.png');
    this.seekButtons({
        forward: 10,
        back: 10
    });
    this.replayButton();
  });

  function jumpVideoTime(x){
    if (!myPlayer.paused()) {
        myPlayer.currentTime(x);
        $('#loop-message').removeClass('message-hide');  
        if (!repeatVideo) {
            repeatVideo = true; 
        }
    }
}

$('#unloop').on('click', () => {
    $('#loop-message').addClass('message-hide');
    if (repeatVideo) {
        repeatVideo = false;
    }
});

function toDigits(num) {
    if (num < 10) {
        return "0" + num;
    }
    else {
        return num;
    }
}

$('#submit_note').on('click', () => {
    let currentTime = myPlayer.currentTime();
    $('#notes').append("<li class=\"note-record\"><a onclick='toNoteTime("+currentTime+");'>" + Math.floor(currentTime/3600) + ":" + toDigits(Math.floor(currentTime/60)) + ":" + toDigits(Math.floor(currentTime % 60)) + "\t-\t" + $('#note_input').val()+"</a></li>");
    $('#note_input').val('');
});

function toNoteTime(time) {
    myPlayer.currentTime(time);
    $('#ensub').text('');
    // $('#jpsub').text('');
    myPlayer.pause();
}
