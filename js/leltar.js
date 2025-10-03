import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"

const logout = document.getElementById("logout");

logout.addEventListener("click", ()=>{
    window.location.pathname = "";
});

export async function UIUpdate(){
    console.log("UPDATING UI1")
    await exportedQMethods.doQueryUpdates();
    console.log("UPDATING UI2")
    exportedRetnMethods.doFrissit(document.querySelectorAll("[cjust].retn:not([cjust=''])"));
    console.log("UPDATING UI3")
    //addEvents();
    console.log("UPDATING UI4")
}

UIUpdate();