import { signup } from "./firebase.js";
import { validateEmail, validatePassword } from "./utilities.js";

let signupBtn = document.querySelector(".sign")

signupBtn.addEventListener("click", () => {
    event.preventDefault()

    let userName = document.querySelector("#username").value.trim()
    let email = validateEmail("email")
    let pass = validatePassword("password")
    let cPass = validatePassword("confirm-password")

    if (userName) {
        if (email) {
            if (pass) {
                if (cPass) {
                    if (pass == cPass) {
                        signup(userName, email, pass)
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Passwords do not match!"
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Enter a combination of at least eight numbers, letters and punctuation marks (such as ! and &) in your password and exclude any leading or trailing spaces."
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Enter a combination of at least eight numbers, letters and punctuation marks (such as ! and &) in your password and exclude any leading or trailing spaces."
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please Enter email in correct format."
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please Enter username."
        });
    }
})