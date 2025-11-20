import { eventTarget } from "./global/globaldata.js";
import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"
import { exportedMethods } from "./global/globaldata.js";
import { qInserts } from "./global/endpoints.js";
import { utJSON, utschema, uttable } from "./global/actuelthings.js";
import { formDRef } from "./global/retntemplates.js";

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
        retnsInner[cjust].push(div);
    }
    else{
        console.log("Nem fa");
        retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
        div.innerHTML = retns[cjust];
        retnsInner[cjust] = [div];
    }
    console.log(retnsInner)
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
        console.log("Fa")
        div.innerHTML = retn;
        retnsInner[cjust].push(div);
    }
    else{
        console.log("Nem fa");
        retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
        div.innerHTML = retns[cjust];
        retnsInner[cjust] = [div];
    }
    console.log(retnsInner)
    this.remove();
  }
}
customElements.define('retn-sh', Retn);
customElements.define('retn-p', RetnP);



const delay = ms => new Promise(res => setTimeout(res, ms));
let num = 65;//0x12345678;
let buffer = new ArrayBuffer(4);
let view = new DataView(buffer);
view.setUint32(0, num); // 4 bájt beírása

// Most konvertáljuk bájtonként "karakterré"
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
//Kuld
async function doKuld(e){
    e.preventDefault();
console.log("EE: SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
console.log(e);
    const urlap = e.target;
    const attrs = {};
    for(const attr of urlap.attributes){
console.log("EIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
console.log(attr.nodeName);
console.log(attr.nodeValue)
        attrs[attr.nodeName] = attr.nodeValue;
    }
console.log(attrs);
    if(!(typeof urlap === "object")){ return 0; };
    const allapotKijelzok = urlap.getElementsByClassName("allapot");
   // const fname = urlap.getAttribute("name") || false;
    //const haveName = fname ? true : false;
    let sikeresKeres = false;
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés folyamatban...");
    const usqF = Number(attrs["usqf"]);
console.log("usqF: " + usqF + " : " + attrs["usqf"]);
    const usesDB = !isNaN(usqF) ? formDRef[usqF]?.split(/[^0-9]/) : [];
console.log(usesDB);
    /*if(!(typeof usesDB[0] === "number")){
        return 0;
    };*/
    //const fbol = usesDB.length > 0;
    const ut = urlap.getAttribute("utjson") || "na";
console.log("UT: " + ut)
    const JSONValue = !isNaN(ut) && typeof ut !== "undefined" ? utJSON[ut] : {};
    if(usesDB[2]) JSONValue["schema"] = utschema[Number(usesDB[2])];
    if(usesDB[3]) JSONValue["table"] = uttable[Number(usesDB[3])];
    const ddtxt = exportedMethods.getDBThings(urlap, usesDB[0], JSONValue);
console.log("HUUUU2232:")
console.log(JSONValue);
console.log(ddtxt);
//console.log(qInserts);
console.log()
    const tr =  exportedMethods.qTextReform(qInserts[usesDB[1]], JSONValue);
console.log(tr);
    const response = await exportedMethods.exampleREST(tr, urlap.getAttribute("method") || "post", ddtxt);
    // if(fbol) addOrEditFormQ(Number(usesDB[0]), jsonValue, fname, response, fvalue);
console.log("Response:\n" + response);
console.log("JSONValue:");
console.log(JSONValue);
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés sikeres!");

    if(!sikeresKeres){
        await exportedQMethods.doQueryUpdates();
        for(const cjust in retns){
console.log("Bejön")
            retns[cjust] = exportedRetnMethods.doUjratolt(cjust);
            for(const inner of retnsInner[cjust]){
console.log("És bejön")
                inner.innerHTML = retns[cjust];
            }
        }
console.log("SLUCK!")
        eventTarget.dispatchEvent(true || urlap.hasAttribute("useRespInEvent") ? 
            new CustomEvent("urlapS" + urlap.getAttribute("action"), {detail: { response: response }}) : MyEvent
        );
        exportedMethods.doEnvAutoJumpJelenet(urlap, "NextToIfSuccess");  
    }
}

// Mi

function kiscica(e){
    console.log("Ez működhet.")
}

function changeview(e){
    // e.value
    // .querySelector(".naga");
}

const runnable = [
    doKuld,
    kiscica,
    changeview
];

function doRun(e, eType = ""){
//    console.log("runs"+eType)
    const runs = e.target.getAttribute("runs"+eType) || "";
//    console.log(runs);
    for(let i = 0; i < runs.length; i++){
 //       console.log("Ruin: " + runs.charCodeAt(i));
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