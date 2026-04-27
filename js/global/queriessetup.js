import { exportedMethods } from "./globaldata.js"
import { endpoints, nonPKendpoints } from "./endpoints.js";
import { ActuelThings } from "./actuelthings.js";

const usqHeaders = [];
const retnThings = [];
export const endpointsResults = [];
export const ActuelThingsResults = [];
export const retnThingsResults = [];

class TN{
	constructor(text){
		this.text=text;
	}
}

class Sec{
	constructor(os, lI, sL, lU){
		this.offset = 0;
		this.lastItemsID = 0;
		this.secLength = 0;
		this.lastUpdated = 0;
	}
}

class PSec{
	constructor(os, uI, lU){
		this.offset64 = 1;
		this.usedIDs = 0; //64bit
		this.lastUpdated = 0;
	}
}

class FSec{
	constructor(fn, sL, lU){
		this.fnumber = 0;
		this.secLength = 0;
		this.lastUpdated = 0;
	}
}

const sec = [ // Table
	[ "", ], // texts
	[[], ], /*  */
];

const primarysec = [
	["", ],
];

const foreignsec = [
	[["", ""], ["", ""] ],
	[[[], [],], [[], [],]]
];

export const whd = [
    endpointsResults,
    ActuelThingsResults,
    retnThings
];

export const whdl =[
	endpoints,
	nonPKendpoints
];


export async function QEnd(ltext, method="POST", dbthings=""){
    return await exportedMethods.exampleREST(ltext + "?alk=" + Number(Math.random() * 5000), method, "") || "";
}

async function QEnds(array, ltext, method, number){
	array[number] = new TN(await QEnd(ltext, method));
	if(number == 5) console.log(array[number]);
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

export async function doQueryUpdates(){
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
