function showpas() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function val() {
    event.preventDefault();
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('email').value.trim();
    var mobileNumber = document.getElementById('mobileNumber').value.trim();
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    var firstNameError = document.getElementById('firstNameError');
    var lastNameError = document.getElementById('lastNameError');
    var genderError = document.getElementById('genderError');
    var emailError = document.getElementById('emailError');
    var mobileNumberError = document.getElementById('mobileNumberError');
    var usernameError = document.getElementById('usernameError');
    var passwordError = document.getElementById('passwordError');
    var confirmPasswordError = document.getElementById('confirmPasswordError');
    // Resetting errors
    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";
    genderError.innerHTML = "";
    emailError.innerHTML = "";
    mobileNumberError.innerHTML = "";
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";

    if (firstName === "") {
        firstNameError.innerHTML = "First name is required ";
        return;
    }

    if (lastName === "") {
        lastNameError.innerHTML = "Last name is required ";
        return;
    }

    var radios = document.getElementsByName("gender");
    var formValid = false;
    var gender;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) 
        {
            formValid = true;
            gender = radios[i].value;
        }
        i++;        
    }
    if (!formValid) 
    {
        genderError.innerHTML = "Gender is required ";
        return;
    } 

    else if (!isValidEmail(email)) {
        emailError.innerHTML = "Invalid email format ";
        return;
    }

    if (mobileNumber === "") {
        mobileNumberError.innerHTML = "Mobile number is required ";
        return;
    } 
    else if (!isValidMobileNumber(mobileNumber)) {
        mobileNumberError.innerHTML = "Invalid mobile number format ";
        return;
    }

    if (username === "") {
        usernameError.innerHTML = "Username is required ";
        return;
    } 
    else if (!isValidUsername(username)){
        usernameError.innerHTML = "Invalid username format ";
        return;
    }

    if (password === "") {
        passwordError.innerHTML = "Password is required ";
        return;

    } else if (!isValidPassword(password)){
        passwordError.innerHTML = "Invalid password format ";
        return;
    } 
    else if (password != confirmPassword){
        confirmPasswordError.innerHTML = "Password and Confirm password are not same ";
        return;
    }
    
    fetch('/signup' , {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ firstName,lastName,gender,email,mobileNumber,username,password,confirmPassword }),
        })
        .then((r) => {r.json()})
          .then((data) => {
            console.log(data);
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
}

function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (emailRegex.test(email));
}

function isValidMobileNumber(mobileNumber) {
    var mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNumber);
}

function isValidUsername(username){
    var usernameRegex = /^[a-zA-Z0-9_.-]*$/;
    return usernameRegex.test(username);
}

function isValidPassword(password){
    var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
}