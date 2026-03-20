
export class CHDiv{
    connectedCallback() {
        const name = this.getAttribute("fname");
        if(name) chdiv[name] = this;        
    }
}
