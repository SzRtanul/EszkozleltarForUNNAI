import { exportedMethods } from "./globaldata.js"
import { endpoints } from "./endpoints.js";
import { ActuelThings } from "./actuelthings.js";
const retnThings = [];
export const endpointsResults = [];
export const ActuelThingsResults = [];
export const retnThingsResults = [];

export const whd = [
    endpointsResults,
    ActuelThingsResults,
    retnThings
];

async function QEnds(array, ltext, method, number){
    array[number] = await exportedMethods.exampleREST(ltext + "?alk=" + Number(Math.random() * 5000), method, "") || "";
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

async function doQueryUpdates(){
    endpointsResults.length = 0;
    ActuelThingsResults.length = 0;
    let promises = [];
    let linmeth = "";

    for(let i = 0; i < endpoints.length; i++){
        linmeth = endpoints[i].split(":");
        const foszlam = endpointsResults.push("")-1;
        if(linmeth[0]) promises.push(QEnds(endpointsResults, linmeth[0]+"", linmeth[1] || "POST", foszlam));
    }

    for(const key in ActuelThings){
        ActuelThingsResults.push(ActuelThings[key]());
    }
    
    try {
        await Promise.all(
            promises.map(p => withTimeout(p, 5000)) // 5 másodperces limit mindegyikre
        );
    }
    catch(e){
        console.error("Hiba történt az adatok lekérése során:\n" + e)
    }
}

export const exportedQMethods = {
    doQueryUpdates: doQueryUpdates,
}
