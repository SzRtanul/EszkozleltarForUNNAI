
import { gl } from "./js/global/globaldata.js";

const modal = document.getElementById("loginModal");
const belepes = document.getElementById("belepes");
const close = document.getElementsByClassName("close")[0];

const login = document.getElementById("login");

belepes.addEventListener("click", ()=>{
    modal.style.display = "block";
});

login.addEventListener("click", ()=>{
    window.location.pathname=gl+"content/leltar.html"
});

close.addEventListener("click", ()=>{
    modal.style.display = "none";
});