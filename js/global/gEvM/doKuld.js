import { doAfter } from "./doAfter.js";
import { gl } from "../globvars.js";
import { exportedMethods } from "../globaldata.js";
import { formDRef, modDRef } from "../retntemplates.js";
import { qInserts } from "../endpoints.js";
import {  } from "../actuelthings.js";

function writeStatus(allapotKijelzok, statcode){
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, statcode < 300 ?
		"Küldés sikeres!" :
		(
			statcode == 404 ? "Program hiba" : "Hibás formátum[Program hiba] vagy egyedi kulcsérték ütközés áll fent!"
		) 
	);
}

//Kuld
export async function doKuld(e, afterMethod=()=>""){
    e.preventDefault();
    const urlap = e.target;
    const attrs = {};
	const fullE = {}
    for(const attr of urlap.attributes){
        attrs[attr.nodeName] = attr.nodeValue;
    }
    
	for(const attr in e){
        fullE[attr] = e[attr];
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
    let stat = { st: 0 };
    const response = await exportedMethods.exampleREST(tr, urlap.getAttribute("method") || "post", ddtxt, stat);
	writeStatus(allapotKijelzok, stat.st);
    if(stat.st < 300){
        await afterMethod(fullE, sikeresKeres, response);
    }
}

export async function doDelete(e){
    let stat = {
        st: 404,
    };
    const del = e.target.closest(".retnrow");
    const allapot = e.target.closest(".film")?.querySelectorAll(".allapot");
    const value = "delete/" + e.target.value;
    await exportedMethods.exampleREST(value, "POST", "", stat);
    if(stat.st < 300 && del) del.remove();
    else if(allapot){
        allapot.innerHTML = stat.st == 404 ? "Program hiba" : "A rekord nem létezik,\n vagy más tábla rekordja hivatkozik rá.";
    }
   // else e.target.classList.add("redborder");
}
