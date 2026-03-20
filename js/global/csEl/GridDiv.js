
export class GridDiv extends HTMLElement {
	connectedCallback() {
		const gridarea = this.getAttribute("TA");
		if(gridarea) this.style.setProperty("grid-area", gridarea);
	}
}


