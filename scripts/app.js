import { getCurrentState, getData } from "./firebase.js";
getCurrentState()

let getDataBtn = document.querySelector("#get-data-btn")

getDataBtn.addEventListener("click", () => {
    getData("users", "#cards-container")
})