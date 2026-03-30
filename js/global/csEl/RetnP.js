import { gl } from "../globvars.js"
import { exportedRetnMethods } from "../events.js"

let iterat = 0;

export class RetnP extends HTMLElement { 
    connectedCallback() {
        iterat++;
        const cjust = this.getAttribute("cjust");
        const name = this.getAttribute("fref");
        const div = this.parentElement;
        const value = div.value || div.getAttribute("value");

        if(name) {
            if(gl.uI[name]) gl.uI[name].push(div);
            else{
                gl.uI[name] = [div];
            } 
        }
        if(!cjust) return;
        const retn = gl.retns[cjust];
        if(retn){
            div.innerHTML = retn;
            gl.rI[cjust].push(div);
        }
        else{
            /*retns[cjust] = */exportedRetnMethods.doUjratolt(cjust);
            div.innerHTML = gl.retns[cjust];
            gl.rI[cjust] = [div];
            gl.rtU.push(cjust);
        }
        if(value && div.tagName == 'SELECT'){
            const dq = div.querySelector("* [value='"+ value +"']");
            dq?.setAttribute("selected", "");
        }
        this.remove();

        /*queueMicrotask(() => {
            //div.value=div.getAttribute("value");
            div.value = value;
        });*/
    }
}

