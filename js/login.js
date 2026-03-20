const modal = document.getElementById("loginModal");
const belepes = document.getElementById("belepes");
const close = document.getElementsByClassName("close")[0];

const login = document.getElementById("login");

belepes.addEventListener("click", ()=>{
    modal.style.display = "block";
});

login.addEventListener("click", ()=>{
    window.location.pathname="content/leltar.html"
});

const logout = document.getElementById("logout");
const test = document.querySelector("form");

logout.addEventListener("click", () => {
    window.location.pathname = "";
});

close.addEventListener("click", ()=>{
    modal.style.display = "none";
});
