import { gl } from "../globvars.js"

export async function doAfter(e, sikeresKeres){
    await exportedQMethods.doQueryUpdates();
    for(const cjust in retns){
        /*retns[cjust] = */exportedRetnMethods.doUjratolt(cjust);
    }
    for(const cjust of gl.rtU){
        for(const inner of retnsInner[cjust]){
            inner.innerHTML = retns[cjust];
            const div = inner;
            const value = div.value || div.getAttribute("value");
            if(value && div.tagName == 'SELECT'){
                const dq = div.querySelector("* [value='"+ value +"']");
                dq?.setAttribute("selected", "");
            }
        }
    }

  /*  eventTarget.dispatchEvent(true || urlap.hasAttribute("useRespInEvent") ? 
        new CustomEvent("urlapS" + urlap.getAttribute("action"), {detail: { response: response }}) : MyEvent
    );*/
    //exportedMethods.doEnvAutoJumpJelenet(urlap, "NextTo");
}

function writeStatus(allapotKijelzok, statcode){
    exportedMethods.doUrlapAllapotFrissites(allapotKijelzok, statcode < 300 ?
		"Küldés sikeres!" :
		(
			statcode == 404 ? "Program hiba" : "Hibás formátum[Program hiba] vagy egyedi kulcsérték ütközés áll fent!"
		) 
	);
}
