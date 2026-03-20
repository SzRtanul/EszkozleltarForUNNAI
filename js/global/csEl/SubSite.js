import { gl, connJS } from "../globvars.js";
import { gEAdd } from "../gEv.js";
import { doParseCHTML } from "../events.js";

export function inithyS(){
	const es = event?.state;
	const sh = sessionStorage.getItem("hyS")
	if(es) gl.hyS = es;
	else if(sh) gl.hyS = JSON.parse(sh);
}

export function doValtM(wh, val){
	gl.subs[wh].doUpd(val);
    const url = new URL(window.location.href);

	const pushorrepl = true ? "pushState" : "replaceState";
	gl.hyS[wh] = val;
    history[pushorrepl](gl.hyS, '', url);
	sessionStorage.setItem("hyS", JSON.stringify(gl.hyS));
}

export function doValt(e){
	const bt = e.target;
	const wh = bt.getAttribute("which");
	const val = bt.value;
	doValtM(wh, val)
}

export class SubSite extends HTMLElement{
    constructor(){
		super();
		this.shdw = null;
		this.cR = new XMLHttpRequest();
		this.doXHRGen();
		this.fname = "";
	}
	
	doXHRGen(){
        this.cR.onload = async () => {
            if (this.cR.status >= 200 && this.cR.status < 300) {   
                let iHTML = this.cR.responseText;
                this.shdw.innerHTML = doParseCHTML(iHTML);
				
				const connst = connJS[this.fname?.split("\.")[0]]?.split(", ") || [];
				for(let i = 0; i < connst.length; i++){
					const sc = document.createElement("script");
					sc.type = "module";
					sc.src = `js/${connst[i] + ".js" + "?v=" + new Date().getTime()}`;
					this.shdw.appendChild(sc);
				}
            } else {
                console.error("Request failed with status:", this.cR.status);
            }
        };
        this.cR.onerror = function () {
            console.error("Request failed due to network error");
        };
	}

	connectedCallback() {
        const name = this.getAttribute("sname");
		const fname = gl.hyS[name] || this.getAttribute("fname");
		this.fname = fname;
		const prnt = this.parentElement;
		if(gl.subs[name]) subs[name].willDisconnect();
		gl.subs[name] = this;
        this.shdw = prnt//.attachShadow({mode: 'open'});
        gEAdd(this.shdw);
		if(fname) this.doUpd(fname);
		this.remove();
    }

	willDisconnect() {
		this.cR.abort();
//		this.shdv.remove();
	}
	
	doUpd(melyik){
		this.cR.abort();
        this.cR.open("GET", "content/" + melyik + "?nocache=" + new Date().getTime(), true);
        // this.cR.withCredentials = true;
        this.cR.setRequestHeader("Cache-Control", "no-store");
        this.cR.setRequestHeader("Pragma", "no-cache");
        this.cR.send();
	}
}
