var myPlayer = videojs('currentVideo', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    controlBar: {
        fullscreenToggle: false,
        pictureInPictureToggle: false,
    },
    playbackRates: [.5, 1, 1.5, 2, 2.5]
});

myPlayer.ready(function() {

    this.hotkeys({
        volumeStep: 0.1,
        seekStep: 10,
        enableModifiersForNumbers: false,
    });

    this.poster('https://i1.wp.com/tvsensei.com/wp-content/uploads/2019/05/cropped-TVSenseilogo-1.png?fit=260%2C250&ssl=1');
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