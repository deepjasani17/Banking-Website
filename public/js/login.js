function showpas() {
    var x = document.getElementById("pname");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function val() {
    var x1 = document.forms["x"]["fname1"].value;
    var latter = /^[a-zA-Z0-9_.-]*$/;
    if (!x1.match(latter)) {
        alert("Enter velid user name");
    }
        fetch('/signup' , {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body : JSON.stringify({ username,password }),
    })
    .then((r) => {r.json()})
    .then((data) => {
        console.log(data);
        window.location.href = '/index1';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}