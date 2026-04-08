//import { gl } from "./global/globvars.js";
import { eventTarget } from "./js/global/globaldata.js";
import { exportedQMethods } from "./js/global/queriessetup.js";
import { exportedRetnMethods, retns } from "./js/global/events.js"

import { qInserts } from "./js/global/endpoints.js";
import { utJSON, utschema, uttable } from "./js/global/actuelthings.js";
import { mezok, insUrlap } from "./js/global/rowftemplates.js";
import { gEAdd } from "./js/global/gEv.js"

// csEl
import { GridDiv } from "./js/global/csEl/GridDiv.js";
import { MarkS } from "./js/global/csEl/MarkS.js";
import { Retn } from "./js/global/csEl/Retn.js";
import { RetnP } from "./js/global/csEl/RetnP.js";
import { MezP } from "./js/global/csEl/MezP.js";

import { CHDiv } from "./js/global/csEl/CHDiv.js";
import { SubSite, inithyS } from "./js/global/csEl/SubSite.js";
// csE1vg
inithyS();

window.addEventListener('popstate', (e) => {
//	console.log("%c Mozgás az előzményekben! URL: " + document.location.href, "color: orange; font-weight: bold;");
//	if (!event.persisted) {
		inithyS();
//	}
});

await exportedQMethods.doQueryUpdates();

const delay = ms => new Promise(res => setTimeout(res, ms));
let num = 65; // 0x12345678
let buffer = new ArrayBuffer(4);
let view = new DataView(buffer);
view.setUint32(0, num); // 4 bájt beírása

let str = String.fromCharCode(...new Uint8Array(buffer));

// Custom line
customElements.define('g-div', GridDiv);
customElements.define('mark-s', MarkS);
customElements.define('retn-sh', Retn);
customElements.define('retn-p', RetnP);
customElements.define('mez-p', MezP);

customElements.define('ch-d', CHDiv);
customElements.define('sub-s', SubSite);

gEAdd(document);
