

$("#englishform").submit(function(e) {
    e.preventDefault();
});

$("#goalsform").submit(function(e) {
    e.preventDefault();
});



function passReqs() {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.value.match(passw)) {
        return true;
    }
}

function submission() {
    if (passReqs()) {
        if (password.value == confirmpassword.value) {
            document.getElementById("confirmpassword").style.border = "1px solid green";
            sessionStorage.loadModal = 'true';
            return true;
        }
        else {
            document.getElementById("errormsg").style.color = 'red';
            document.getElementById("errormsg").innerHTML = "The two provided passwords do not match.";
            document.getElementById("password").style.border = "1px solid red";
            document.getElementById("confirmpassword").style.border = "1px solid red";
            password.value = "";
            confirmpassword.value = "";
            return false;
        }

    } else {
        return false;
    }
}

function strongPassword() {
    if (passReqs()) {
        document.getElementById("errormsg").style.color = 'green';
        document.getElementById("errormsg").innerHTML = "The provided password is strong!";
        document.getElementById("password").style.border = "1px solid green";
        document.getElementById("confirmpassword").style.border = '1px solid #ced4da';
    }
    else {
        document.getElementById("errormsg").style.color = 'red';
        document.getElementById("errormsg").innerHTML = "The provided password does not meet one or all of the requirements above.";
        document.getElementById("password").style.border = "1px solid red";
    }
}

function loadProfileModal() {
    // DELETE LINE BELOW, SOLELY FOR TESTING
    // $('#profileModal').modal('show');
    // 
    if (sessionStorage.loadModal == 'true') {
        $('#profileModal').modal('show');
    }
    sessionStorage.clear();
}

function openContinueModal(){
    $('#profileModal').modal('hide');
    $('#continueModal').modal('show');
}

function closeContinueModal() {
    $('#continueModal').modal('hide');

}

function openEnglishbox() {
    $('#englishModal').modal('show');
}

function closeEnglishModal() {
    var text = document.getElementById("englishtext").value;
    document.getElementById("englishdescription").value = text;
    $('#englishModal').modal('hide');

}

function openGoalsbox() {
    $('#goalsModal').modal('show');
}

function closeGoalsModal() {
    var text = document.getElementById("goalstext").value;
    document.getElementById("goalsdescription").value = text;
    $('#goalsModal').modal('hide');

}