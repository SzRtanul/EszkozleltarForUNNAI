import { whd } from "./queriessetup.js";
import { utschema, uttable } from "./actuelthings.js";
import { formDRef, modDRef } from "./retntemplates.js";

export let eventTarget = new EventTarget();
export const outsideEventMethStores = [];
export const serverhost = "http://localhost:13000/EszkozleltarForUNNAI/";

function doResetEventTarget(){
    eventTarget = new EventTarget();
}

function doMindenhezHozzaad(mikhez, methods=[], eventID="", parameters=[], eventtipus="click"){
    for(const elem of mikhez){
        if(!(eventID &&
                elem.dataset.events && 
                exportedMethods.isBenneVan(elem.dataset.events.split(";"), eventID))
        ){
            const eventcharchain = (elem.getAttribute(eventID+"Event") ?? eventtipus) || "";
            const eventtypeslist = eventcharchain.split(';') ?? [];
            for(let i = 0; i < eventtypeslist.length; i++){
                //console.log(eventtypeslist[i])
                elem.addEventListener(eventtypeslist[i], async function(e){
                    let both = true;
                    for(let i = 0; i < methods.length && both; i++){
                        const pr = parameters[i] ?? [];
                        const parame = await methods[i](e, ...pr);
                        both = typeof parame === "boolean" ? parame : true;
                    }
// console.log(eventtypeslist[i])
                });
            }
            if(!elem.dataset.events) elem.dataset.events = "";
            if(eventID.length > 0) elem.dataset.events += eventID + ";";
        }
    }
}

function doMindennelMegcsinál(miken, mitmethod, parameters=[]){
    for(const elem of miken){
        mitmethod(elem, ...parameters);
    }
}

//
// Film eleje -------------
//
function doEnvAutoJumpJelenet(environment, mialapjan="nextTo"){
    const hovas = environment.getAttribute(mialapjan)?.split(';');
    const film = environment.closest(".film");
    for(let i = 0; i < hovas?.length || 0; i++){
        const hova = hovas[i].split(':')
        if(hova?.length > 1){
            if(film) exportedMethods.doJelenetValtas(film, hova[1], hova[0])
        }
    }
}

function actionableAutoJumpJelenet(e, mialapjan="nextTo"){
    const hovas = e.target.getAttribute(mialapjan)?.split(';');
    const film = e.target.closest(".film");
    for(let i = 0; i < hovas?.length || 0; i++){
        const hova = hovas[i].split(':')
        if(hova?.length > 1){
            if(film) exportedMethods.doJelenetValtas(film, hova[1], hova[0])
        }
    }
}

function doJelenetValtas(urlap, hova, tipus="scen"){
    exportedMethods.doMindennelMegcsinál(
        urlap.querySelectorAll("."+tipus + ".sceneI"), 
        exportedMethods.setAnythingOnElement, 
        [["classList", "remove"], 
        ["sceneI"]]);
    exportedMethods.doMindennelMegcsinál(
        urlap.getElementsByClassName(tipus+hova), 
        exportedMethods.setAnythingOnElement, 
        [["classList", "add"], 
        ["sceneI"]]);
    //console\.log("Eljutott")
}
//
// Film vége -------------
//

function doUrlapAllapotFrissites(mezok, szoveg){
    for(const mezo of mezok){
        mezo.innerHTML = szoveg;
    }
}

function getCryptoHash(text){
    /*const buffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("")*/
    const sab = new SharedArrayBuffer(4);
    const int32 = new Int32Array(sab);
    let buffer = "";

    crypto.subtle.digest("SHA-512", new TextEncoder().encode(text))
        .then(r => { buffer = r; Atomics.store(int32, 0, 1); Atomics.notify(int32, 0); });
    Atomics.wait(int32, 0, 0);
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function qTextReform(qtext="", jsonValue){
    let dbFro = "";
    const fr = qtext.split('\\-');
    for(let i = 0; i < fr.length; i++){
        if(fr[i].startsWith('$')){
            fr[i] = jsonValue[fr[i].replace("$", "")];
        }
        dbFro += fr[i];
    }
    return dbFro;
}

function getUrlapJSONs(urlap){
    const myUrlap = urlap.querySelectorAll("* [name]:not([name=''])");
    const jsonValue = {};
    for(const mezo of myUrlap){
       // if (typeof mezo.name !== "string" || mezo.name.trim() === "") mezo.name="";
        if(mezo.name && mezo.name.length > 0){
            jsonValue[mezo.name] = 
                mezo.type !== "checkbox" ? 
                    (mezo.classList.contains("xhr") ? 
                        getCryptoHash(mezo.value) : 
                        mezo.value) : 
                    mezo.checked
            ;
        }
    }
    return jsonValue;
}

let num = 0; //0x12345678;
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
const txtenc = new TextEncoder();

function getMez(mezo, text){
    return text.length > 0 ? ((mezo.classList.contains("woap") ? text : '\'' + text?.replaceAll('\'', '\'\'') + '\'') + ',') : "null,";
}

function getSchemTab(al1, al2){
    return [utschema[al1], uttable[al2]];
}

function getSchemTabValFromUsqF(usqF){
    const usesDB = !isNaN(usqF) ? getSchemTab(...formDRef[usqF]?.split(/[^0-9]/).map(Number)) : [];
    return usesDB.join("/");
}

function getDBThings(urlap, mode=0, JSONValue={}, viewObjects=[]){
    const myUrlap = urlap.querySelectorAll("* [name]:not([name=''])");
    //const myUrlap = urlap.elements;
    let fullText = "";
    let columns = "";
    let values = "";
    for(const mezo of myUrlap){
        // if (typeof mezo.name !== "string" || mezo.name.trim() === "") mezo.name="";
        if(mezo.name && mezo.name.length > 0){
            const text = 
                mezo.type !== "checkbox" ? 
                    (mezo.classList.contains("xhr") ? 
                    getCryptoHash(mezo.value) : 
                    mezo.value) : 
                    (mezo.checked ? 1 : 0) + ""
                    ;
                    if(mezo.classList.contains("mez")){
                        if(mode == 0){
                            columns += mezo.name + ",";
                    values += getMez(mezo, text);
                }
                else if(mode == 1){
                    values += mezo.name + "=" + getMez(mezo, text);
                }
                else if(mode == 2){
                    values += getMez(mezo, text);
                }
            }
            if(mezo.classList.contains("settr")){
                JSONValue[mezo.name] = text;
            }
            if(mezo.classList.contains("view")){
                viewObjects.push(mezo);
            }
        }
    }
    if(columns.length>0) columns = columns.substring(0, columns.length-1);
    
    num = txtenc.encode(values).length-1;
    console.log("Text hossz: " + num);
    view.setUint32(0, num);
    const num32ui = new Uint8Array(buffer);
    console.log("Num32UI: " + num32ui)
    num32ui.reverse();
    
    const bits = [...num32ui].map(b => b.toString(2).padStart(8, "0")).join(" ");
    console.log(bits);
    const str = String.fromCharCode(...num32ui);
    const decodedBytes = Uint8Array.from(str, c => c.charCodeAt(0));
    
    const bitstream = [...decodedBytes].map(b => b.toString(2).padStart(8, "0")).join("");
    console.log(bitstream);
    fullText = (mode==0 ? columns + "\x00" : "") + String.fromCharCode(...num32ui) + values.substring(0, values.length-1);
    console.log("Full: " + fullText);
    return fullText;
}


function getValueFromAll(Cname="", jsonValue={}, localAktuels={}){
    let oText = "";
    const mezoTagG = Cname.split("-");
    if(mezoTagG.length > 1 && !isNaN(mezoTagG[0])){
        switch(Number(mezoTagG[0])){
            case 0:
                oText = jsonValue[mezoTagG[1]] || "";
                break;
            case 1:
                oText = localStorage.getItem(mezoTagG[1]) || "";
                break;
            case 3:
                oText = sessionStorage.getItem(mezoTagG[1]) || "";
                break;
            case 4:
                oText = whd[mezoTagG[1]] || "";
                break;
        }
    }
    return mezoTagG.length > 2 && !isNaN(mezoTagG[2]) ?
        oText.split(";")[Number(mezoTagG[2])] || "" : oText;
}

async function getRest(honnan="", method="POST", dbthings = ""){
    const fetchJSON = {
        method: method.toUpperCase(),
       /* wittCredentials: true,
        credentials: "include",*/
        headers: {
            //'Cache-Control': 'no-cache',
            cache: 'no-store',
          //  ContentType: 'application/text',
          //  Accept: '',
           // Others: others
        }
    };
    switch(method.toUpperCase()){
        case "GET":
        case "HEAD":
            break;
        default:
            fetchJSON["body"] = dbthings;
        break;
    }
    return await fetch(serverhost + honnan, fetchJSON).catch(error => { return null; });
}

async function exampleREST(honnan="", method="POST", dbthings=""){
    const response = await getRest(honnan, method, dbthings);
    return await response ? await response.text() : "err:HIBA: A szerver elérhetetlen.";
}

export const exportedMethods = {
    doMindenhezHozzaad: doMindenhezHozzaad,
    doMindennelMegcsinál: doMindennelMegcsinál,
    doResetEventTarget: doResetEventTarget,
    doEnvAutoJumpJelenet: doEnvAutoJumpJelenet,
    actionableAutoJumpJelenet: actionableAutoJumpJelenet,
    doJelenetValtas: doJelenetValtas,
    doUrlapAllapotFrissites: doUrlapAllapotFrissites,
    getUrlapJSONs: getUrlapJSONs,
    getValueFromAll: getValueFromAll,
    getCryptoHash: getCryptoHash,
    getDBThings: getDBThings,
    getSchemTab: getSchemTab,
    getSchemTabValFromUsqF: getSchemTabValFromUsqF,
    qTextReform: qTextReform,
    exampleREST: exampleREST,
};