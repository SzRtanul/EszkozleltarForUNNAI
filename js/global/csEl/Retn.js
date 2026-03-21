import { gl } from "../globvars.js";
import { gEAdd } from "../gEv.js";
import { exportedRetnMethods } from "../events.js";

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
		<mark-s></mark-s>`;
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
