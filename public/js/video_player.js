/*CEO: Henry Aberle 
	Lead Programmer January - June 2019: Peter Aguiar */
	
	/* All the scripting for video */
	
var vid, repeatButton, timecodes, repeatEventListener, playStatus;
var repeatVideo = false;
var playStatus = false;
var vidLine = "vidLine";

var subs = [];
var subsJap = [];

function initializeVid(x=[]){
	
	vid = document.getElementById("currentVideo");
	repeatButton = document.getElementById("repeatButtonVid");
	playButton = document.getElementById("playButton")
	timecodes = x;
	assToSubs("Hakone_Subbing.ass","eng");
	assToSubs("Hakone_Jap_Subs.ass","jap");
	
	startEventHandler();

}

function jumpVideoTime(x){

	vid.currentTime=x;
}

function playVid(){
	
	if(playStatus){
		vid.pause();
		playButton.className = "btn btn-success";
		playButton.value = "Play";
		playStatus = false;
		
	}
	else{
		vid.play();
		playButton.className = "btn btn-danger";
		playButton.value = "Pause";
		playStatus = true;

	}

	
	

}

function pauseVid(){
	pass;
}

function restartVid(){
	
	vid.currentTime = 0;
	playVid();
}

function skipForwardVid(x = 10){
	
	
	vid.currentTime += x;
}

function skipBackwardVid(x = 10){
	
	vid.currentTime -= x;
}

function toggleRepeatVid(){
	
	repeatVideo = !repeatVideo;
	
	if(repeatVideo){
		
		repeatButton.className = "btn btn-info";
		
		
		
	}else{
		
		repeatButton.className = "btn btn-secondary";
		
	}
		
} 






function startEventHandler(){
	
	/*Creates a subprocess the runs constantly by executing the code below.*/
	
	repeatEventListener = function(){
		for (var i = 0; i < timecodes.length; i++){
			
				
			if((this.currentTime >= timecodes[i][1]) && (Math.floor(this.currentTime) == Math.floor(timecodes[i][1]))  && repeatVideo){ //Repeats the videoif button is active.
				this.pause;
				this.currentTime = timecodes[i][0];
				break;
			}
			}
			
		/* Tiny subs is short hand for native lanuage, in this case English.
		The big subs is the target learning language, in this case Japanese.*/
		
		for (var j = 0; j < subs.length; j++){
			
			var tinysubs= document.getElementsByName("subTestEnglish");
			
			
			
			if((this.currentTime >= subs[j][0]) && (this.currentTime <= subs[j][1])){
				
				tinysubs[0].textContent = subs[j][2];
			
				
			
				
			}
		}
		for (var k = 0; k < subsJap.length; k++){
			
			var bigsubs = document.getElementsByName("subTestJapanese");
			
			
			if((this.currentTime >= subsJap[k][0]) && (this.currentTime <= subsJap[j][1])){
				
				bigsubs[0].textContent = subsJap[k][2];
				
				
			}
		}
		}; //The entire functione is written directly into the statement...
		
		vid.addEventListener("timeupdate",repeatEventListener); //...and is saved as repeatEventListener
}

function timecodeToSeconds(x){
	var temp = x.split(":");
	
	var temp2 = (parseFloat(temp[0])*3600) + (parseFloat(temp[1])*60) + parseFloat(temp[2]);
	
	return temp2;
	
}

function assToSubs(targetSubs, lang){
	
	var getSubs = new XMLHttpRequest();
	
	getSubs.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			
			/*Inelegant, but works. Finds keywords and skips ahead.*/
			var subSheet= this.responseText;
			var subLines = subSheet.split("[Events]");
			subLines = subLines[1];
			subLines = subLines.split("Dialogue:");
			
			
			for ( var i = 0; i < subLines.length; i++){
				var temp;
				temp = subLines[i+1].split(","); /*Split rest of document by commas*/
				
				if (lang == "eng"){
					subs.push([]);
					subs[i].push(timecodeToSeconds(temp[1])); //convert timecodes to seconds.
					subs[i].push(timecodeToSeconds(temp[2]));
				}
				else if (lang == "jap"){
					subsJap.push([]);
					subsJap[i].push(timecodeToSeconds(temp[1]));
					subsJap[i].push(timecodeToSeconds(temp[2]));
				}
					
				var dialogue = "";
				
				
				for (var k = 9; k < temp.length; k++){ 
				/*The ninth commas contains dialogue. Split will divide the diaolgue up if commas
				are present. Thus we must check if there is more dialogue past the ninth diliminator.*/
					dialogue = dialogue.concat(temp[k]); 
					
				}
				
				if (lang == "eng"){
				
					subs[i].push(dialogue);
					
				}else if (lang == "jap"){
						
					subsJap[i].push(dialogue);
				}
				
				
			}
			
			
			
			
		}
	};
	getSubs.open("GET", targetSubs ,true);
	getSubs.send();
	
	
}
	








