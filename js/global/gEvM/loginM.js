import { gl } from "../globvars.js";
import { doKuld } from "./doKuld.js";
import { doValtM } from "../csEl/SubSite.js";

function loginAfter(e){
	doValtM("global", "telawiew.html")
}

// Mi
export function loginKuld(e){
	//doKuld(e, loginAfter);
	loginAfter();
}
