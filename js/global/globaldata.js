import { whd } from "./queriessetup.js";

export let eventTarget = new EventTarget();
export const outsideEventMethStores = [];
export const serverhost = "http://192.168.0.136:18081/";

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
            for(let i = 0; i<eventtypeslist.length; i++){
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

async function getCryptoHash(text){
    /*const buffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("")*/
    const buffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(text));
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

async function getUrlapJSONs(urlap){
    const myUrlap = urlap.querySelectorAll("* [name]:not([name=''])");
    const jsonValue = {};
    for(const mezo of myUrlap){
       // if (typeof mezo.name !== "string" || mezo.name.trim() === "") mezo.name="";
        if(mezo.name && mezo.name.length > 0){
            if(!mezo.classList.contains("woap")){
                jsonValue[mezo.name] = 
                    mezo.type !== "checkbox" ? 
                        (mezo.classList.contains("xhr") ? 
                            await getCryptoHash(mezo.value) : 
                            mezo.value) : 
                        mezo.checked
                ;
            }
            else{
                let jsonMezoField = JSON.stringify(jsonValue);
                jsonMezoField = jsonMezoField.substring(0, jsonMezoField.length - 1) +
                    `${Object.keys(jsonValue).length > 0 ? "," : ""}`+
                    `"${mezo.name}":${mezo.type !== "checkbox" ?
                            mezo.value || null : mezo.checked}}`;
                console.log(jsonMezoField);
                jsonValue = JSON.parse(jsonMezoField);
            }
        }
    }
    return await jsonValue;
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

async function getRest(honnan="", method="POST", db="", cAzon={}){
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
            fetchJSON["body"] = JSON.stringify({
                token: Number(localStorage.getItem("token")) || 5,
                CAzon: cAzon,
                db: db,
                //   ,CEdit: cEdit
            })
        break;
    }
    return await fetch(serverhost + honnan, fetchJSON).catch(error => { return null; });
}

async function exampleREST(honnan="", method="POST", db="", cAzon={}){
    const response = getRest(honnan, method, db, cAzon);
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
    exampleREST: exampleREST,
};