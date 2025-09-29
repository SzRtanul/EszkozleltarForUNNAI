import { gl } from "./global/globaldata.js";
import { dataJSONs } from "./global/constructionofdata.js";
import { ment, betolt } from "./global/betoltment.js";

//betolt();

const logout = document.getElementById("logout");

logout.addEventListener("click", ()=>{
    window.location.pathname = "";
});