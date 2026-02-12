import { uploadImage } from "./cloudinary.js";
import { getCurrentState, getData, updateData, deleteData } from "./firebase.js";
getCurrentState()

let getDataBtn = document.querySelector("#get-data-btn")
let updateUserId = ""

// GET
getDataBtn.addEventListener("click", () => {
    getData("users")
})


// UPDATE
// MODAL
const modal = document.getElementById("modal");
const openBtn = document.getElementById("update-btn");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("userForm");

window.addEventListener("click", () => {
    if (event.target.id === "update-btn") {
        let card =  event.target.closest(".card")
        let userName = card.querySelector(".username").innerText
        let email = card.querySelector(".email").innerText.slice(7)
        let password = card.querySelector(".password").innerText.slice(10)

        document.getElementById("username").value = userName
        document.getElementById("email").value = email
        document.getElementById("password").value = password
        
        updateUserId = card.dataset.id
        modal.style.display = "flex";
    }
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const inputImg = document.getElementById("input-image");
    let secure_url = ""

    let file = inputImg.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'uploadImg');
        
        secure_url = await uploadImage(formData)
    }

    let userDataObj = {
        userName: userName,
        email: email,
        pass: password,
    }

    if (secure_url) {
        userDataObj.profilePic = secure_url
    }

    updateData("users", updateUserId, userDataObj)
    getData("users")

    form.reset();
    modal.style.display = "none";
});

// DELETE
document.addEventListener("click", () => {
    if (event.target.id === "delete-btn") {
        const deleteUserId = event.target.closest(".card").dataset.id
        deleteData("users", deleteUserId)
        getData("users")
    }
})