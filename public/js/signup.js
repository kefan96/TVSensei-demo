// $('#password, #confirmpassword').on('keyup', function () {
//     if ($('#password').val() == $('#confirmpassword').val()) {
//       $('#message').html('Matching').css('color', 'green');
//     } else 
//       $('#message').html('Not Matching').css('color', 'red');
//   })



// $("#signupform").submit(function(e) {
//     e.preventDefault();
// });

var fname = document.getElementById("firstname")
var password = document.getElementById("password");
var confirmpassword = document.getElementById("confirmpassword");

function submission() {
    if (validatePSW()) {
        if (password.value == confirmpassword.value) {
            $("#loginModal").modal('show');
            return true;
      }
        else {
        document.getElementById("errormsg").innerHTML = "The two provided passwords do not match.";
        password.value = "";
        confirmpassword.value = "";
        return false;
    }
    
  }
}

function validatePSW() {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.value.match(passw)) {
       return true;
    }
    else {
        document.getElementById("errormsg").innerHTML = "The provided password does not meet one or all of the requirements above.";
        password.value = "";
        confirmpassword.value = "";
        return false;
    }
}
