import { exportedMethods } from "./globaldata.js"
import { endpoints } from "./endpoints.js";
import { ActuelThings } from "./actuelthings.js";

export const endpointsResults = [

];

export const whd = [
    endpointsResults,
    //ActuelThings
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
    let promises = [];
    let linmeth = "";

    for(let i = 0; i < endpoints.length; i++){
        linmeth = endpoints[i].split(":");
        const foszlam = endpointsResults.push("")-1;
        promises.push(QEnds(endpointsResults, linmeth[0]+"", linmeth[1] || "POST", foszlam));
    }
    
    console.log("Szeretem én ezt?: ");
    console.log("Nem.");
    console.log(promises)
    try {
        await Promise.all(
            promises.map(p => withTimeout(p, 5000)) // 5 másodperces limit mindegyikre
        );
        console.log(endpointsResults)
    }
    catch{
        console.log("Hiba történt az adatok lekérése során.")
    }
    console.log("Nem.");
}

export const exportedQMethods = {
    doQueryUpdates: doQueryUpdates,
}