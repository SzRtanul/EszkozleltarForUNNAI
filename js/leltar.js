import { exportedQMethods } from "./global/queriessetup.js";
import { exportedRetnMethods } from "./global/events.js"
import { exportedMethods } from "./global/globaldata.js";

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
    const urlap = e.target.closest(".urlap");
    if(!(typeof urlap === "object")){
        return 0;
    };
    const jsonValue = await exportedMethods.getUrlapJSONs(urlap);
    const allapotKijelzok = urlap.getElementsByClassName("allapot");
    const fvalue = urlap.getAttribute("value") || "callquery";
    const fname = urlap.getAttribute("name") || false;
    //const haveName = fname ? true : false;
    let sikeresKeres = false;
    for(const btn of urlap.querySelectorAll("*:not(.urlap):not(.retn) .kuld, .kuldG")){
        btn.setAttribute("disabled", "");
    }
    // urlap.classList.add("disable");
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés folyamatban...");
console.log("ONYE")
    // Adatfeldolgozás
    {
console.log(urlap.getAttribute("usqF"));
        const usesDB = formDRef[Number(urlap.getAttribute("usqF"))].split(/[^0-9]/);
console.log("F: " + usesDB.length)
        const fbol = usesDB.length == 1;
console.log(usesDB);
        const ddtxt = exportedQMethods.qTextReform(
            (fbol || (usesDB.length>1 && usesDB[0] == 0)) ?
            formQs[Number(usesDB[usesDB.length>1?1:0])] : noRefreshQs[Number(usesDB[1])], jsonValue)
        ;
        const tr = exportedQMethods.qTextReform(fvalue, jsonValue);
        //jsonValue["ca"].datum = 2;
        //
        // ExampleRest;;
        //
console.log("ddtx: " + ddtxt);
        const response = await exportedMethods.exampleREST(
            tr, urlap.getAttribute("method") || "post",
            ddtxt, jsonValue
        );
        if(fbol) addOrEditFormQ(Number(usesDB[0]), jsonValue, fname, response, fvalue);
        console.log("Response:\n" + response);
        console.log("JSONValue:")
        console.log(jsonValue)
        exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, "Küldés sikeres!");
        // urlap.classList.remove("disable");
        for(const btn of urlap.querySelectorAll("*:not(.urlap):not(.retn) .kuld, .kuldG")){
            btn.removeAttribute("disabled");
        }
    
        if(!sikeresKeres){
            console.log("FESZ");
           // await UIUpdate();
            console.log("UFFESZ");
            for(const retn of document.querySelectorAll(`[name="${fname}"].retn[cjust]:not([cjust=''])`)){
                exportedRetnMethods.doUjratolt(retn, tres);
            }
console.log("SLUCK!")
            eventTarget.dispatchEvent(true || urlap.hasAttribute("useRespInEvent") ? 
                new CustomEvent("urlapS"+urlap.getAttribute("action"), 
                    {detail: 
                        {
                            // urlapID: fullID, // ??????????? NOT IN SCOPE
                            response: response,
                        }
                    }
                ) : MyEvent
            );
            addEvents();
    
            // Add to updateList
            //await doFrissit();
            exportedMethods.doEnvAutoJumpJelenet(urlap, "NextToIfSuccess");  
        }
    }
}

function kiscica(e){
    console.log("Ez működhet.")
}

const runnable = [
    doKuld,
    kiscica
];

function doRun(e, eType = ""){
    const runs = e.target.getAttribute("runs"+eType) || "";
    for(let i = 0; i < runs.length; i++){
        runnable[runs.charCodeAt(i)](e);
    }
    console.log("yeeee: "+ e.target.classList);
}

document.addEventListener("click", (e) => {
    
});