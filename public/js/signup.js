const phoneInputField = document.querySelector("#mobileNumber");
   const phoneInput = window.intlTelInput(phoneInputField, {
     utilsScript:
       "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    }
);

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
    const countryData = phoneInput.getSelectedCountryData();
    var country = countryData.name;
    var mobileNumber = document.getElementById('mobileNumber').value.trim();
    var upiId = mobileNumber + "@dbbank";
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

    if(email===""){
        emailError.innerHTML = "email is required";
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
    var radios1 = document.getElementsByName("actype");
    var formValid1 = false;
    var accountType;
    var i = 0;
    while (!formValid1 && i < radios1.length) {
        if (radios1[i].checked) 
        {
            formValid1 = true;
            accountType = radios1[i].value;
        }
        i++;        
    }
    if (!formValid1) 
    {
        actypeError.innerHTML = "Account type is required ";
        return;
    } 
    else if (!isValidMobileNumber()) {
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
    console.log(upiId);
    fetch('/signup' , {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ firstName,lastName,gender,email,mobileNumber,username,password,confirmPassword,upiId,country,accountType }),
        })
        .then((r) => {return r.json()})
        .then((data) => {
            alert(data.txt);
            if(data.txt != 'Sign up succesfull, Try to log in now' ) return;
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
}

function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(email)) {
        var domain = email.split('@')[1];
        var tldRegex = /^(com|net|org|edu|int|gov|mil|arpa|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)$/i;
        if (tldRegex.test(domain.split('.').pop())) {
            return true; 
        } else {
            return false; 
        }
    } else {
        return false; 
    }
}

function isValidMobileNumber() {
    const isValidMobile = phoneInput.isValidNumber(true);
    if(isValidMobile) return true;
    else return false;
}


function isValidUsername(username){
    var usernameRegex = /^[a-zA-Z0-9_.-]*$/;
    return usernameRegex.test(username);
}

function isValidPassword(password){
    var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
    return true;
}