import { gl } from "../globvars.js";
import { gEAdd } from "../gEv.js";
import { exportedRetnMethods } from "../events.js";
import { doQueryUpdates, QEnd } from "../queriessetup.js";

const [alek, adj] = [".alekten", "[adj]"];

export function findAdj(e){
	const tr = e.target;
	const ret = tr.closest(".alekten");
	const ehn = ret?.querySelector(".tinalekten")
	return [ret, ehn];
}

export async function retreload(e){
	const tr = e.target;
	const cjust = tr.getAttribute("cjust");
	const ret = tr.parentElement;
	const retin = ret?.querySelector(".alekten");
	if(retin){
		await doQueryUpdates();
		exportedRetnMethods.doUjratolt(cjust);
		ret.outerHTML = gl.retns[cjust];
	}
}

export async function upload(e, uu, resp, isInsert=false){
	const tr = e.target;
	const ret = tr.closest(".alekten");
	if(ret){
//		console.log("EHJ:\n" + resp);
		const cjust = ret.getAttribute("cjust");
		await doQueryUpdates();
		const rep = exportedRetnMethods.doUjratolt(
			cjust, resp, true
		);
//		console.log("REP:\n" + rep)
		if(isInsert){
			const ehn = ret.querySelector("[adj]")
			const adj = ehn.getAttribute("adj");
			ehn.insertAdjacentHTML(adj, rep);
		}
		else{
			const ahn = tr.closest(".retnrow");
			ahn.outerHTML = rep;
		}
	}
}

export function uploadI(...e){
	upload(e[0], e[1], e[2], true);
}
function setOffLim(envs, off, lim){
	const gletta = envs[0].getAttribute("gku");
	const gku = gku.split("-");
	let env = envs[0];
	let jR = false;
	if(envs[1]){
		jR = true;
		env = envs[1];
	}
	const re = doUjratolt(gku[0]/*-6*/, undefined, jR, gku[1]); /**/
	env.innerHTML = re;


}

function InDeCrease(e){
	
}

function setOffLimE(e){
	const tr = e.target;
	const oll = [
		tr.getAttribute("sname"),
		tr.getAttribute("setoff"),
		tr.getAttribute("setlim")
	];
	if(oll[0]){
		gl.uI[oll[0]].setOffLim(Number(oll[1]), Number(oll[2]));
	}
	else{
		const on = findAdj(e.target);
		setOffLim(on, Number(oll[1]), Number(oll[2]));
	}
}

function setRespIn(env, resp){ // Ürlap
	env.innerHTML = resp;
}

function setRespInE(e, resp){

}

/*
gei off="" lim="" cjust="['cjust-13[-101]']">gei gránát

*/

export class Retn extends HTMLElement {
	constructor(){
		super();
		this.locate = -1;
		this.cjust = "";
		this.name = "";
		/*this.rI = gl.rI;
		this.rHP = gl.rtHP;
		this.rHN = gl.rtHN;
		this.uI = gl.uI;*/
		this.endp="";
		this.div=null;
	}

	setOffLim(o=0, lim=50, szur={}){
		let dts = "";
		dts = QEnd(this.endp+"/"+o+"/"+lim, undefined);
		
	};

	disconnectedCallback() {
    //	console.log('disconnected');
//		this.rHP[this.cjust][this.locate] = 0;
	};

  	connectedCallback() {
		this.cjust = this.getAttribute("cjust");
		const cjust = this.cjust;
		if(!cjust) return;
		const shadow = this/*.attachShadow({mode: 'open'})*/;
		this.name = this.getAttribute("fref");
		const filtOsz = this.getAttribute("flos");
		const filtVals = this.getAttribute("flvs");
		const name = this.name || "";

		shadow.innerHTML = 
		`
		<link rel="stylesheet" href="../global.css">
		<link rel="stylesheet" href="../css/leltar.css">
		<link rel="stylesheet" href="../css/leltarGrid.css">
		<mark-s class="alekten" cjust='${cjust}'></mark-s>`;
		const div = shadow.querySelector("mark-s");
		this.div = div;
		let isUr = 0;

		if(name) {
			this.uI[name] = this;
		}
		//
//		gEAdd(shadow);
		const edU = exportedRetnMethods.doUjratolt(cjust);
		setRespIn(div, edU);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} has changed.`);
	}
}
