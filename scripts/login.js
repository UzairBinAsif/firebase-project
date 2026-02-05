import { login } from "./firebase.js";
import { validateEmail, validatePassword } from "./utilities.js";

let loginBtn = document.querySelector("#login")

loginBtn.addEventListener("click", () => {
    event.preventDefault()
    let email = document.querySelector("#email").value.trim()
    let pass = validatePassword("password")

    if (email != "auth/missing-email") {
        if (pass) {
            login(email, pass)
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Invalid Credentials."
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid Credentials."
        });
    }
})