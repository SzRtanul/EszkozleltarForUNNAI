import { gl } from "../globvars.js";
import { doKuld, doDelete } from "./doKuld.js";
import { doAfter } from "./doAfter.js";
import { doValt } from "../csEl/SubSite.js";
import { retreload, upload, uploadI } from "../csEl/Retn.js";
import { loginKuld } from "./loginM.js";
import { doFilm, setToFilm} from "../csEl/Film.js";

function doInject(e){
    doAfter(e)
}

function doReplace(e){
    doAfter(e);
    const row = e.target.closest(".retnrow")
}

function doKuldIns(e){
    doKuld(e, uploadI);
}

function doKuldUpd(e){
    doKuld(e, upload);
}

function doUpdate(e){

}

function changeview(e){
    // const name = e.target.getAttribute("fname");
    // if(chdiv[name]) chdiv[name].classList.add();
}

function doSelVal(e){
    e.target.setAttribute("value", e.target.value);
}

function doSetParam(e){
    const d = e.target;
    const dn = d.getAttribute("attri");
    if(dn) d.setAttribute(dn, d.value);
}

export const runnable = [
    doKuldIns,
    doKuldUpd,
    changeview,
    doDelete,
    doUpdate,
    // 6.
    doFilm,
    doSelVal,
    setToFilm,
    doSetParam,
	doValt,
	// 11.
	loginKuld,
	retreload,
];
