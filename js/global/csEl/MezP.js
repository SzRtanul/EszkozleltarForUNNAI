import { insUrlap, mezok } from  "../rowftemplates.js";

export class MezP extends HTMLElement{
    connectedCallback() {
        const name = this.getAttribute("mez");
        this.outerHTML = insUrlap(mezok[name](), "Hozzáad")
    }
}
