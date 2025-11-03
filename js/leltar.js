import { eventTarget } from "./global/globaldata.js";
import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"
import { exportedMethods } from "./global/globaldata.js";
import { qInserts } from "./global/endpoints.js";
import { utJSON, utschema, uttable } from "./global/actuelthings.js";

const delay = ms => new Promise(res => setTimeout(res, ms));
let num = 65;//0x12345678;
let buffer = new ArrayBuffer(4);
let view = new DataView(buffer);
view.setUint32(0, num); // 4 bájt beírása

// Most konvertáljuk bájtonként "karakterré"
let str = String.fromCharCode(...new Uint8Array(buffer));
console.log(str);

const logout = document.getElementById("logout");

logout.addEventListener("click", ()=>{
    window.location.pathname = "";
});

export async function UIUpdate(){
    console.log("UPDATING UI1")
    await exportedQMethods.doQueryUpdates();
    console.log("UPDATING UI2")
    const listofretns = document.querySelectorAll("[cjust].retn:not([cjust=''])");
    console.log(listofretns);
    exportedRetnMethods.doFrissit(listofretns);
    console.log("UPDATING UI3")
    //addEvents();
    console.log("UPDATING UI4")
}

UIUpdate();

//Kuld
async function doKuld(e){
    e.preventDefault();
    console.log("EE:")
    console.log(e)
    const urlap = e.target;
    
    if(!(typeof urlap === "object")){
        return 0;
    };
    const allapotKijelzok = urlap.getElementsByClassName("allapot");
    const fname = urlap.getAttribute("name") || false;
    //const haveName = fname ? true : false;
    let sikeresKeres = false;
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés folyamatban...");
    
    const usesDB = urlap.getAttribute("usqF")?.split(/[^0-9]/);
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
console.log("JSONValue:")
console.log(JSONValue)
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés sikeres!");

    if(!sikeresKeres){
        console.log("FESZ");
        // await UIUpdate();
        console.log("UFFESZ");
        for(const retn of document.querySelectorAll(`[name="${fname}"].retn[cjust]:not([cjust=''])`)){
            exportedRetnMethods.doUjratolt(retn, tres);
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
 //   console.log("runs"+eType)
    const runs = e.target.getAttribute("runs"+eType) || "";
//    console.log(runs);
    for(let i = 0; i < runs.length; i++){
 //       console.log("Ruin: " + runs.charCodeAt(i));
        runnable[runs.charCodeAt(i)-1](e);
    }
}

function eventSample(eventtype = "click"){
  //  console.log("Run it!")
    document.addEventListener(eventtype, (e) => {
  //      console.log("EJ")
        doRun(e, eventtype);
    });
}

eventSample();
//eventSample("Enter");
eventSample("submit");
eventSample("change");