var exercises = ['instruction', 'vocabulary', 'speaking', 'grammar', 'quiz', 'notes'];
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

    var settings = this.textTrackSettings;
    settings.setValues({
        "backgroundColor": "#555", 
        "backgroundOpacity": "0.5",
        "edgeStyle": "uniform",
        "fontPercent": "0.75"
    });
    settings.updateDisplay();

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

function addRow() {
    if (checkInput()) {
        var table = document.getElementById("vocabTable");
        // data-toggle="tooltip" title="Sign up"
        var row= document.createElement("tr");
        var def1 = document.createElement("td");
        def1.setAttribute("class", "created");
        def1.setAttribute("data-toggle", "tooltip");
        def1.setAttribute("data-placement", "left");
        def1.setAttribute("title", "Edit");
        var def2 = document.createElement("td");
        def2.setAttribute("class", "created");
        def2.setAttribute("data-toggle", "tooltip");
        def2.setAttribute("data-placement", "left");
        def2.setAttribute("title", "Edit");
        var def3 = document.createElement("td");
        def3.setAttribute("class", "created");
        def3.setAttribute("data-toggle", "tooltip");
        def3.setAttribute("data-placement", "left");
        def3.setAttribute("title", "Edit");
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        def1.innerHTML = document.getElementById("def1").value;
        def2.innerHTML = document.getElementById("def2").value;
        def3.innerHTML = document.getElementById("def3").value;

        row.appendChild(def1);
        row.appendChild(def2);
        row.appendChild(def3);

        table.children[1].appendChild(row);

        document.getElementById("errormsg").innerHTML = ""

        $('#def1').val('');
        $('#def2').val('');
        $('#def3').val('');
    }
    else {
        document.getElementById("errormsg").innerHTML = "Please fill out all areas"
    }   
}

function checkInput(){
    var input1 = document.forms['vForm'].Hiragana.value;
    var input2 = document.forms['vForm'].Romaji.value;
    var input3 = document.forms['vForm'].Definition.value;

    if ((input1 == null || input1 == "") || (input2 == null || input2 == "") || (input3 == null || input3 == "")) {
        return false;
    }
    return true;
}


// function for link in instruction
function checkout(tab) {
    // switch tab
    $('#exercise-body .active.show').removeClass('active show');
    $('#tab-' + tab).addClass('active show');
    $('#exercise-header .dropdown-menu .active.show').removeClass('active show');
    $('#' + tab + '-dropdown').addClass('active show');
    $('#dropdownMenuButton').text(tab);
}

// Overriding dropdown menu
$('#exercise-header .dropdown-menu a.dropdown-item').on('click', function(){
    $('#exercise-header .dropdown-menu .active.show').removeClass('active show');
    $(this).addClass('active show');
    $('#exercise-body .active.show').removeClass('active show');
    $($(this).attr('href')).addClass('active show');
    $('#dropdownMenuButton').text($(this).text());
});

$('tbody').on('click', 'td.created', function(){
    $(this).html('<input type="text" style="width: 60px;">');
    $(this).removeClass('created');
    $(this).addClass('editing');
});

$('tbody').on('keypress', 'td.editing', function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $(this).html(($(this).children().val()));
        $(this).removeClass('editing');
        $(this).addClass('created');
    }
});
