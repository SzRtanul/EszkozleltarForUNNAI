import { eventTarget } from "./global/globaldata.js";
import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"
import { exportedMethods } from "./global/globaldata.js";
import { qInserts } from "./global/endpoints.js";
import { utJSON, utschema, uttable } from "./global/actuelthings.js";
import { formDRef, modDRef } from "./global/retntemplates.js";
import { mezok, insUrlap } from "./global/rowftemplates.js";

const retns = {};
const retnsInner = {};
const subsite = {};
const chdiv = {};
const currentRequest = {};
const urlapInner = {};

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
        const value = div.value || div.getAttribute("value");
        console.log("VellYou!!!: " + value);
        console.log(div)
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
        //    console.log(retnsInner);
        if(div.tagName == 'SELECT') div.querySelector("* [value='"+ value +"']")?.setAttribute("selected", "");
        this.remove();
       // console.log("YellYe");
       // console.log(div)

        /*queueMicrotask(() => {
            //div.value=div.getAttribute("value");
            div.value = value;
        });*/
    }
}

class MezP extends HTMLElement{
    connectedCallback() {
        const name = this.getAttribute("mez");
        this.outerHTML = insUrlap(mezok[name](), "Hozzáad")
    }
}

class CHDiv{
    connectedCallback() {
        const name = this.getAttribute("fname");
        if(name) chdiv[name] = this;        
    }
}

class SubSite extends HTMLElement{
    connectedCallback() {
        const name = this.getAttribute("fname");
        if (currentRequest[name]) {
            currentRequest.abort();
        }
        else{
            currentRequest[name] = new XMLHttpRequest();
        }
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = "";
        subsite[name] = shadow;
        eventSample("click", shadow);
        //eventSample("Enter", shadow);
        eventSample("submit", shadow);
        eventSample("change", shadow);

        currentRequest.open("GET", "content/" + melyik + "?nocache=" + new Date().getTime(), true);
        //currentRequest.withCredentials = true;
        currentRequest.setRequestHeader("Cache-Control", "no-store");
        currentRequest.setRequestHeader("Pragma", "no-cache");

        currentRequest.onload = async function () {
            console.log("EN")
            if (currentRequest.status >= 200 && currentRequest.status < 300) {   
                let iHTML = currentRequest.responseText;
                shadow.innerHTML = iHTML;
            //    sessionStorage.setItem("oldal", melyik);
            } else {
                console.error("Request failed with status:", currentRequest.status);
            }
            console.log("ENNAE")
        };
        currentRequest.onerror = function () {
            console.error("Request failed due to network error");
        };
        currentRequest.send();
        console.log("ONPREM")
    } 
}

customElements.define('retn-sh', Retn);
customElements.define('retn-p', RetnP);
customElements.define('mez-p', MezP);
customElements.define('ch-d', CHDiv);
customElements.define('sub-s', SubSite);



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

logout.addEventListener("click", () => {
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
    await exportedQMethods.doQueryUpdates();
    for(const cjust in retns){
        retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
        for(const inner of retnsInner[cjust]){
            inner.innerHTML = retns[cjust];
        }
    }

  /*  eventTarget.dispatchEvent(true || urlap.hasAttribute("useRespInEvent") ? 
        new CustomEvent("urlapS" + urlap.getAttribute("action"), {detail: { response: response }}) : MyEvent
    );*/
    //exportedMethods.doEnvAutoJumpJelenet(urlap, "NextTo");
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
//    const mod = Number(attrs["mod"]);
    const usqF = attrs["usqf"]?.split(/[^0-9]/).map(Number);
    const ut = urlap.getAttribute("utjson") || "na";
    let ddtxt = "";
    let tr = "";
    if(fvalue){
        const JSONValue = !isNaN(ut) && typeof ut !== "undefined" ? utJSON[ut] : {};
        ddtxt = exportedMethods.getDBThings(urlap, usqF[0], JSONValue);
        tr =  exportedMethods.qTextReform(fvalue, JSONValue);
    }
    else if(usqF.length > 1){
        const usesMOD = !isNaN(usqF[0]) ? modDRef[usqF[0]]?.split(/[^0-9]/) : [];
        const usesDB = !isNaN(usqF[1]) ? exportedMethods.getSchemTab(...formDRef[usqF[1]]?.split(/[^0-9]/).map(Number)) : [];
        const row = Number(usqF[2]);
        
        const JSONValue = !isNaN(ut) && typeof ut !== "undefined" ? utJSON[ut] : {};
        if(usesDB[0]) JSONValue["schema"] = usesDB[0];
        if(usesDB[1]) JSONValue["table"] = usesDB[1];
        if(!isNaN(row)) JSONValue["row"] = row;
        if(usesMOD.length > 1) ddtxt = exportedMethods.getDBThings(urlap, usesMOD[1], JSONValue);
        tr =  exportedMethods.qTextReform(qInserts[usesMOD[0]], JSONValue);
    }
    let stat = {
        st: 0
    };
    const response = await exportedMethods.exampleREST(tr, urlap.getAttribute("method") || "post", ddtxt, stat);
    console.log("Stat: " + stat.st);
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, stat.st < 300 ? "Küldés sikeres!" : "Küldés sikertelen!");
    if(stat.st < 300){
        doAfter(e, sikeresKeres, response);
    }
}

async function doDelete(e){
    console.log("Flááke");
    let stat = {
        st: 0,
    };
    console.log(e);
    const del = e.target.closest(".retnrow");
    await exportedMethods.exampleREST("delete/" + e.target.value, "POST", "", stat);
    console.log("Stat: " + stat.st);
    console.log(del);
    if(stat.st < 300 && del) del.remove();
   // else e.target.classList.add("redborder");
}

function doUpdate(e){

}

// Mi

function kiscica(e){
    console.log("Ez működhet.")
}

function changeview(e){
    // const name = e.target.getAttribute("fname");
    // if(chdiv[name]) chdiv[name].classList.add();
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

function doSelVal(e){
    console.log(e.target);
    e.target.setAttribute("value", e.target.value);
}

const runnable = [
    doKuld,
    kiscica,
    changeview,
    doDelete,
    doUpdate,
    // 6.
    doFilm,
    doSelVal
];

async function doRun(e, eType = ""){
//    console.log("runs"+eType)
    const runs = e.target.getAttribute("runs"+eType) || "";
//    console.log(runs);
    for(let i = 0; i < runs.length; i++){
       console.log("Ruin: " + runs.charCodeAt(i));
        await runnable[runs.charCodeAt(i)-1](e);
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