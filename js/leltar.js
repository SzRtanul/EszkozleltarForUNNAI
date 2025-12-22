import { eventTarget } from "./global/globaldata.js";
import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"
import { exportedMethods } from "./global/globaldata.js";
import { qInserts } from "./global/endpoints.js";
import { utJSON, utschema, uttable } from "./global/actuelthings.js";
import { formDRef } from "./global/retntemplates.js";
import { mezok, insUrlap } from "./global/rowftemplates.js";

const szt = "szét\x00kell\x00választani";
console.log(szt.split("\x00"));

const retns = {
    
};

const retnsInner = {

};

const urlapInner = {

};

await exportedQMethods.doQueryUpdates();

class Retn extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    const cjust = this.getAttribute("cjust");
    const name = this.getAttribute("fref");
    shadow.innerHTML = 
    `<link rel="stylesheet" href="../global.css">
    <link rel="stylesheet" href="../css/leltar.css">
    <div></div>`;
    const div = shadow.querySelector("div");
    if(name) {
        if(urlapInner[name])urlapInner[name].push(div);
        else{
            urlapInner[name] = [div];
        } 
    }
    if(!cjust) return;
    const retn = retns[cjust];
    eventSample("click", shadow);
    //eventSample("Enter", shadow);
    eventSample("submit", shadow);
    eventSample("change", shadow);
    if(retn){
        console.log("Fa")
        div.innerHTML = retn;
        if(!this.hasAttribute("no")) retnsInner[cjust].push(div);
    }
    else{
        console.log("Nem fa: " + cjust);
        retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
        div.innerHTML = retns[cjust];
        if(!this.hasAttribute("no")) retnsInner[cjust] = [div];
    }
//    console.log(retnsInner)
  }
}

class RetnP extends HTMLElement {
  connectedCallback() {
    const cjust = this.getAttribute("cjust");
    const name = this.getAttribute("fref");
    const div = this.parentElement;
    if(name) {
        if(urlapInner[name])urlapInner[name].push(div);
        else{
            urlapInner[name] = [div];
        } 
    }
    if(!cjust) return;
    const retn = retns[cjust];
    if(retn){
//        console.log("Fa")
        div.innerHTML = retn;
        retnsInner[cjust].push(div);
    }
    else{
//        console.log("Nem fa");
        retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
        div.innerHTML = retns[cjust];
        retnsInner[cjust] = [div];
    }
//    console.log(retnsInner)
    div.value=div.getAttribute("value");
    this.remove();
  }
}

class MezP extends HTMLElement{
    connectedCallback() {
        const name = this.getAttribute("mez");
        this.outerHTML = insUrlap(mezok[name](), "Hozzáad")
    }
}

customElements.define('retn-sh', Retn);
customElements.define('retn-p', RetnP);
customElements.define('mez-p', MezP);



const delay = ms => new Promise(res => setTimeout(res, ms));
let num = 65;//0x12345678;
let buffer = new ArrayBuffer(4);
let view = new DataView(buffer);
view.setUint32(0, num); // 4 bájt beírása

let str = String.fromCharCode(...new Uint8Array(buffer));
console.log(str);

const logout = document.getElementById("logout");

const test = document.querySelector("form");
console.log("Itt:")
console.log(test.attributes);

logout.addEventListener("click", ()=>{
    window.location.pathname = "";
});
/*
export async function UIUpdate(){
    console.log("UPDATING UI1")
    console.log("UPDATING UI2")
    const listofretns = document.querySelectorAll("[cjust].retn:not([cjust=''])");
    console.log(listofretns);
    exportedRetnMethods.doFrissit(listofretns);
    console.log("UPDATING UI3")
    //addEvents();
    console.log("UPDATING UI4")
}
*/

 async function doAfter(e, sikeresKeres){
    if(!sikeresKeres){
        await exportedQMethods.doQueryUpdates();
        for(const cjust in retns){
            retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
            for(const inner of retnsInner[cjust]){
                inner.innerHTML = retns[cjust];
            }
        }

        eventTarget.dispatchEvent(true || urlap.hasAttribute("useRespInEvent") ? 
            new CustomEvent("urlapS" + urlap.getAttribute("action"), {detail: { response: response }}) : MyEvent
        );
        exportedMethods.doEnvAutoJumpJelenet(urlap, "NextToIfSuccess");
    }
}

//Kuld
async function doKuld(e){
    e.preventDefault();
console.log("EE: SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    const urlap = e.target;
    const attrs = {};
    for(const attr of urlap.attributes){
        attrs[attr.nodeName] = attr.nodeValue;
    }
    if(!(typeof urlap === "object")){ return 0; };
    const allapotKijelzok = urlap.getElementsByClassName("allapot");
    //const fname = urlap.getAttribute("name") || false;
    const fvalue = attrs["value"];
    let sikeresKeres = false;
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés folyamatban...");
    const usqF = Number(attrs["usqf"]);
    const ut = urlap.getAttribute("utjson") || "na";
    let ddtxt = "";
    let tr = "";
    if(fvalue){
        const JSONValue = !isNaN(ut) && typeof ut !== "undefined" ? utJSON[ut] : {};
        ddtxt = exportedMethods.getDBThings(urlap, usqF, JSONValue);
        tr =  exportedMethods.qTextReform(fvalue, JSONValue);
    }
    else{
        const usesDB = !isNaN(usqF) ? formDRef[usqF]?.split(/[^0-9]/) : [];
        const JSONValue = !isNaN(ut) && typeof ut !== "undefined" ? utJSON[ut] : {};
        if(usesDB[2]) JSONValue["schema"] = utschema[Number(usesDB[2])];
        if(usesDB[3]) JSONValue["table"] = uttable[Number(usesDB[3])];
        ddtxt = exportedMethods.getDBThings(urlap, usesDB[0], JSONValue);
        tr =  exportedMethods.qTextReform(qInserts[usesDB[1]], JSONValue);
    }
    const response = await exportedMethods.exampleREST(tr, urlap.getAttribute("method") || "post", ddtxt);
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés sikeres!");
//    doAfter(e, sikeresKeres, response);
}

function doDelete(e){
    console.log("Flááke")
    exportedMethods.exampleREST("delete/"+e.target.value, "POST", "");
    const del = e.target.closest(".retnrow");
    if(del) del.remove();
    else console.log("A törlés nem sikeres.")
}

function doUpdate(e){

}

// Mi

function kiscica(e){
    console.log("Ez működhet.")
}

function changeview(e){
    // e.value
    // .querySelector(".naga");
}

function doFilm(e){
    const hovas = e.target.getAttribute("nextTo")?.split(';');
    const film = e.target.closest(".film");
    if(film  && hovas){
        for(let i = 0; i < hovas.length; i++){
            const hova = hovas[i].split(':');
            const hol = hova[1];
            const tipus = hova[0];
            if(hova?.length > 1){
                for(const jel of film.querySelectorAll("."+tipus + ".sceneI")){
                    jel.classList.remove("sceneI");
                }
                for(const jel of film.getElementsByClassName(tipus+hol)){
                    jel.classList.add("sceneI");
                }
            }
        }
    }
}

const runnable = [
    doKuld,
    kiscica,
    changeview,
    doDelete,
    doUpdate,
    doFilm
];

function doRun(e, eType = ""){
//    console.log("runs"+eType)
    const runs = e.target.getAttribute("runs"+eType) || "";
//    console.log(runs);
    for(let i = 0; i < runs.length; i++){
       console.log("Ruin: " + runs.charCodeAt(i));
        runnable[runs.charCodeAt(i)-1](e);
    }
}

function eventSample(eventtype = "click", environment=document){
  //  console.log("Run it!")
    environment.addEventListener(eventtype, (e) => {
        e.stopPropagation();
        console.log(e.target.attributes);
        doRun(e, eventtype);
    });
}

eventSample();
//eventSample("Enter");
eventSample("submit");
eventSample("change");