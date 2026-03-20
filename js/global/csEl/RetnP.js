

let iterat = 0;

export class RetnP extends HTMLElement { 
    connectedCallback() {
        iterat++;
        const cjust = this.getAttribute("cjust");
        const name = this.getAttribute("fref");
        const div = this.parentElement;
        const value = div.value || div.getAttribute("value");

        if(name) {
            if(urlapInner[name]) urlapInner[name].push(div);
            else{
                urlapInner[name] = [div];
            } 
        }
        if(!cjust) return;
        const retn = retns[cjust];
        if(retn){
            div.innerHTML = retn;
            retnsInner[cjust].push(div);
        }
        else{
            /*retns[cjust] = */exportedRetnMethods.doUjratolt(cjust);
            div.innerHTML = retns[cjust];
            retnsInner[cjust] = [div];
            retnUpdatable.push(cjust);
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



