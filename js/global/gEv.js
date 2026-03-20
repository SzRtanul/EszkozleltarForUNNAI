import { runnable } from "./gEvM/gEvM.js"

export async function doRun(e, eType = ""){
    const runs = e.target.getAttribute("runs"+eType) || "";
    for(let i = 0; i < runs.length; i++){
        await runnable[runs.charCodeAt(i)-1](e);
    }
}

export function eventSample(eventtype = "click", environment=document){
    environment.addEventListener(eventtype, async (e) => {
        e.stopPropagation();
        await doRun(e, eventtype);
    });
}

export function gEAdd(env){
	eventSample("click", env);
	//eventSample("Enter", env);
	eventSample("submit", env);
	eventSample("change", env);
}
