import { gl } from "../globvars.js";
import { gEAdd } from "../gEv.js";
import { exportedRetnMethods } from "../events.js";
import { doQueryUpdates } from "../queriessetup.js";

export async function retreload(e){
	const tr = e.target;
	const cjust = tr.getAttribute("cjust");
	const ret = tr.parentElement;
	const retin = ret?.querySelector(".alekten");
	if(retin){
		doQueryUpdates();
		doUjratolt(cjust);
		ret.outerHTML = gl.retns[cjust];
	}
}

export function upload(e, uu, resp, isInsert=false){
	console.log("Te retkes gechi!:");
	console.log(e.target)
	const tr = e.target;
	const ret = tr.closest(".alekten");
	if(ret){
		const cjust = ret.getAttribute("cjust");
		const rep = exportedRetnMethods.doUjratolt(cjust, resp);
		if(isInsert){
			ret.querySelector("aaa").insertBefore(rep, ret.children[0]);
		}
		else{
			tr.outerHTML = rep;
		}
	}
}

export function uploadI(...e){
	console.log("Te retkes fasszopó kurva!");
	console.log(e[0]);
	upload(e[0], e[1], e[2], true);
}

export class Retn extends HTMLElement {
	constructor(){
		super();
		this.locate = -1;
		this.cjust = "";
		this.name = "";
		this.rI = gl.rI;
		this.rHP = gl.rtHP;
		this.rHN = gl.rtHN;
		this.uI = gl.uI;
	}

	disconnectedCallback() {
    //	console.log('disconnected');
		this.rHP[this.cjust][locate] = 0;
	}

  	connectedCallback() {
		const shadow = this.attachShadow({mode: 'open'});
		this.cjust = this.getAttribute("cjust");
		this.name = this.getAttribute("fref");
		const filtOsz = this.getAttribute("flos");
		const filtVals = this.getAttribute("flvs");
		const cjust = this.cjust;
		const name = this.name || "";

		shadow.innerHTML = 
		`<link rel="stylesheet" href="../global.css">
		<link rel="stylesheet" href="../css/leltar.css">
		<link rel="stylesheet" href="../css/leltarGrid.css">
		<mark-s class="alekten"></mark-s>`;
		const div = shadow.querySelector("mark-s");
		let isUr = 0;

		if(name) {
			if(this.uI[name]) this.uI[name].push(div);
			else{
				this.uI[name] = [div];
			} 
		}
		//
		if(!cjust) return;
		const retn = gl.retns[cjust];
		gEAdd(shadow);
		if(!retn){
			/*retns[cjust] = */exportedRetnMethods.doUjratolt(cjust);
			div.innerHTML = gl.retns[cjust];
//			if(!this.hasAttribute("no")) 
			this.rHP[cjust] = [0];
			this.rI[cjust] = [div];
			this.rHN[cjust] = [name];
		}
		else{
			if(false && this.hasAttribute("no")){
				div.innerHTML = retn;
			}
			else{
				let i = -1;
				const rhplen = this.rHP[cjust].length;
				const retH = this.rHP[cjust];
				do{ i++; }while(i < rhplen && retH[i] == 0 && this.rHN[cjust][i] == name);

				if((i >>> 0) < rhplen){
					div.appendChild(this.rI[cjust][i]);
					retH[i] |= 1;
				}
				else {
					div.innerHTML = retn;
					this.rI[cjust].push(div);
					retH.push(1);
					this.rHN[cjust].push(name);
				}
				this.locate = i;
			}
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} has changed.`);
	}
}
