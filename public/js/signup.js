$("#signupform").submit(function (e) {
    e.preventDefault();
});

var inputfname = document.getElementById("firstname").value;
localStorage.setItem("fname", inputfname);

var password = document.getElementById("password");
var confirmpassword = document.getElementById("confirmpassword");

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
            window.location.href = '/lesson';
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
    if (sessionStorage.loadModal == 'true') {
        $('#profileModal').modal('show');
    }
    sessionStorage.clear();
}


// TODO: Potentially personalize Welcome message with first name from input
// document.getElementById("profileModalTitle").innerHTML = "Welcome to the TVSensei Family " + localStorage.getItem("fname") + "!";