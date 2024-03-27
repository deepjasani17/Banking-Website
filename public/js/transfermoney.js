function toggleFields() {
    var bankType = document.getElementById("bank-type").value;
    var otherBankFields = document.getElementById("other-bank-fields");
    
    if (bankType === "other-bank") {
        otherBankFields.style.display = "block";
    } else {
        otherBankFields.style.display = "none";
    }
}

function transferMoney() {
    var bankType = document.getElementById("bank-type").value;
    var recipientInfo = document.getElementById("recipient-info").value;

    if (bankType === "same-bank") {
        // Perform same bank transfer logic
        alert("Transfering money to " + recipientInfo + " via Same Bank");
    } else {
        var recipientName = document.getElementById("recipient-name").value;
        var accountNumber = document.getElementById("account-number").value;
        var ifscCode = document.getElementById("ifsc-code").value;

        // Perform other bank transfer logic
        alert("Transfering money to " + recipientName + " via Other Bank");
        alert("Recipient Name: " + recipientName + "\nAccount Number: " + accountNumber + "\nIFSC Code: " + ifscCode);
    }

    // Implement actual transfer logic here
}
