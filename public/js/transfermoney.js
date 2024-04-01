var x=0;
function toggleFields() {
    var bankType = document.getElementById("bank-type").value;
    var otherBankFields = document.getElementById("other-bank-fields");
    
    if (bankType === "other-bank") {
        otherBankFields.style.display = "block";
        x=1
    } else {
        otherBankFields.style.display = "none";
    }
}

function transferMoney() {
    event.preventDefault();
    var accnum=document.getElementById("account-number").value.trim();
    var recpnum=document.getElementById("recipient-name").value.trim();
    var amount=document.getElementById("amount");
    var ifsc=document.getElementById("ifsc-code").value.trim();
    var accountnumberError=document.getElementById("accountnumberError");
    var recipientnameError=document.getElementById("recipientnameError");
    var amountError=document.getElementById("amountError");
    var ifsccodeError=document.getElementById("ifsccodeError");
    accountnumberError.innerHTML = "";
    recipientnameError.innerHTML = "";
    ifsccodeError.innerHTML = "";
    amountError.innerHTML = "";
    const mon=Number(amount.value);
    if(mon == 0){
        console.log(mon);
    }
    if(accnum==="")
    {
        accountnumberError.innerHTML = "Account number is requird";
        return;
    } else if(x==0){
        if((accnum.length < 10) || (((accnum[0]+accnum[1]+accnum[2])!="151") && ((accnum[0]+accnum[1]+accnum[2])!="152"))){
            console.log(accnum[0]+accnum[1]+accnum[2])
            accountnumberError.innerHTML = "Enter valid Account number";
            return;
        }
    }
    if(recpnum==="")
    {
        recipientnameError.innerHTML = "Recipirnt number is requird";
        return;
    }
    if(ifsc==="" && x==1)
    {
        console.log("hello")
        ifsccodeError.innerHTML = "IFSC code is requird";
        return;
    }
    if(mon==0 || mon<0 )
    {
        amountError.innerHTML = "Ammount is required";
        return;
    }
    fetch('/transfermoney' , {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({accnum,amount,ifsc}),
        })
        .then((r) => {return r.json()})
        .then((data) => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
}
