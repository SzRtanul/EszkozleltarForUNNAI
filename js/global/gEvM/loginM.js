import { gl } from "../globvars.js";
import { doKuld } from "./doKuld.js";
import { doValtM } from "../csEl/SubSite.js";

function loginAfter(e){
//	gl.subs["global"].doUpd("leltar");
	doValtM("global", "leltar")
}

// Mi
export function loginKuld(e){
	doKuld(e, loginAfter);
}
