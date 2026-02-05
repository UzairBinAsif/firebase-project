function validateRadioBtns(radioNames) {
    let radioBtns = document.getElementsByName(radioNames)
    for (var i = 0; i < radioBtns.length; i++) {
        if(radioBtns[i].checked) {
            return radioBtns[i].value
        }
    }
    return false
}

function validateEmail(emailId) {
    let email = document.getElementById(emailId).value
    email = email.trim()
    let includesAt = false

    if (email) {
        for (var i = 0; i < email.length; i++) {
            if (email[i] == "@" || includesAt) {
                includesAt = true
                if (email[i] == ".") {
                    return email
                }
            }
        }
    }
    return false
}

function validatePassword(passId) {
    let pass = document.getElementById(passId).value
    let sepcialChar = "!@#$%^&*()_-,.?"
    pass = pass.trim()
    
    if (pass) {
        if (pass.length > 8) {
            for (var i = 0; i < pass.length; i++) {
                if (sepcialChar.includes(pass[i])) {
                    return pass
                }
            }
        }
    }
    return false
}

export {validateEmail, validatePassword}