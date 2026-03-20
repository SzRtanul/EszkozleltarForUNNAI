import { whd } from "./queriessetup.js";
import { retnCombinations } from "./retntemplates.js";
import { templates } from "./rowtemplates.js";

const columnSep = "\x00";

export const retns = {};
export const retnsUsQsAndRowsNums = {};

export const exportedRetnMethods = {
    doUjratolt: doUjratolt,
    whataf: whataf
}

export function rJoin(arr=[], sp=""){
	let output = "";
	for(let i = arr.length - 1; i > -1; i--){
		output += arr[i] + sp;
	}
	return output.substring(0, output.length - (sp?.length || 0));
}

export function doParseCHTML(oHTML=""){
	let output = "";
	const stack = [];
	const allt = oHTML.split(/^\x00|\n\x00/g);
	for(let i = 0; i < allt.length; i++){
		let actE = allt[i];
		if(!actE || actE.length == 0) continue;
		if(actE.charCodeAt(0) == 0xFF){
			console.log("Kuraf: " + actE.substring(1, actE.length));
			output += actE.substring(1, actE.length);
			console.log("Kurafi:\n" + output);
			continue;
		}
		// Kilépés szám
		let uhti = (actE[0].charCodeAt(0)) >>> 0;
		const htk = uhti & 1;
		uhti = (uhti >> 1) & 0b1111111;
		// Tartalom elé satcked végek
		if(uhti > 0){
			const stk = stack.splice(stack.length - uhti, uhti);
			output += rJoin(stk, "\n")
		}
		if(actE.length < 2) continue;
		let oSgn = 0;
		let oKezd = 0;
		const vlSgn = [' ', '>'];
		const vl = [-1, -1];
		const aEl = actE.length;
		actE = actE.substring(1, actE[aEl-1] == '\n' ? aEl-1 : aEl);
		let j = 0;
		for(; j < actE.length; j++){
			for(let oSgn = oKezd; oSgn < vlSgn.length; oSgn++){
				if(actE[j] == vlSgn[oSgn]){
					vl[oSgn] = j;
					oKezd = oSgn + 1; 
					oSgn++;
				}
			}
		}
		let vege = "";
		// Tartalom
		if(vl[1] == -1){
			output += "<" + actE + ">\n";
			vl[1] = actE.length;
		}
		else{
			output += "<" + actE;
		}
		if (vl[0] == -1) vl[0] = vl[1];
		vege = "</" + actE.substring(0, vl[0]) + ">";
		// Vége rákerül
		if(htk == 1){ 
			stack.push(vege)
		}
		else{
			output += vege;
		}
	}
	output += rJoin(stack, "\n");
	return output;
}

function aTF(text=""){
	const acl = doParseCHTML("\x00\xFF" + text);
	return acl;
}

export function makeUpdateForm(e){
    // e.target 
    const item = e.target;
    const allPs = item.getAttribute("params")?.split(";"); // Sorrend: cjust(?), usqT, id: JSON
    
    const virtForm = "";
}

function doUjratolt(cjust="", responseInput=0, szur=""){
    let res = [];
    const two = retnCombinations[cjust]?.split("|||");
    if(!two || two.length<2){
        return;
    }
    const metnames = two[0].split(":");
    const templeBefs = [];
    const templeUsq = [];
    const befRowsNum = [];
    let templeLast = -1;
    let yeP = 0;
    const ye = two[1]?.split("---");
    const yelen = ye.length-1;
    for(const cja of ye){
        if(cja.startsWith("?")){
            const rn = cja.substring(1, cja.length);
            if(rn.length > 0){
                const retn = retns[rn];
                if(!retn){
                    /*retns[rn] = */doUjratolt(rn);
                }
                const rUBRs = retnsUsQsAndRowsNums[rn];
                templeBefs.push(retns[rn]);
                templeUsq.push(rUBRs[0]);
                befRowsNum.push(rUBRs[1]);
                templeLast++;
            }
        }
        else if(cja.length > 10){
            const methods = [];
            for(let i = 0; i < 8; i+=2){
                const metnum = Number("0x"+cja.substring(i,i+2));
                methods.push(!isNaN(metnum) && metnum != 255 ? templates[metnames[metnum]] : 0);
            }
            const reqType = Number("0x"+ cja.substring(9, 10));
            const reqNum = Number("0x"+ cja.substring(10, 12));
            if(!isNaN(reqType) && !isNaN(reqNum) && reqType < whd.length && reqNum<whd[reqType].length){
                templeUsq.push(
                    yeP == yelen && responseInput != 0 ? responseInput : whd[reqType][reqNum]
                );
                templeLast++;
            }
            else{
                templeUsq.push("F\x01");
                templeLast++;
                //break;
            }
            if(cja.length >13){
                const materia = cja.substring(13, cja.length).split(":_"); // retnrowType selecter(választó)
                let mal = "";
                const resultBef = [];
                const resultQ = [];
                const befIlter = [];
                let anex = 0;
                const resrownums = [];
                const resultsBefRowsNums = [];
                const whereBef = [];
                let befsNum = 0;
                let mata = 0;
                for(const len of materia){
                    const lklen = len.split(":");
                    let lastResBefIndex = whereBef.push((resultBef.length + lklen.length)) -1;
                    for(const lk of lklen){ // To retnrow
                        const matre = lk.split(/[-,=\;]+/).filter(Boolean); // filter parameters with retnrow
                        let hirF = Number(matre[0]);
                        if(matre && matre.length > 0 && !isNaN(hirF) && hirF < yeP){
                            resultBef.push(templeBefs[hirF]);
                            resultQ.push(templeUsq[hirF]);
                            resultsBefRowsNums.push(befRowsNum[hirF]);
                        }
                        else{
                            whereBef[lastResBefIndex]--; // Utolsó hiba: --2025. 08. 08. 15:46--
                        }
                        if(mata < 1){
                            //mode implementation
                            let mat = 1;
                            matre.length = matre.length & 0b111111; // LIMITÁCIÓ
                            let matlimn = matre.length;
                            let bfg = matre.length;
                            if((matlimn & 1) == 0){
                                if(matre[1]) bfg = (Number("0b" + matre[1]) << (32 - matre[1].length)) ^ (bfg - 1);
                                mat = 2;
                            }
                            befIlter.push(bfg);
                            for(; mat < matlimn; mat++){
                                befIlter.push(isNaN(matre[mat]) ? matre[mat] : Number(matre[mat]));
                            }
                        }
                        befsNum++;
                    }
                    mata++;
                }
                templeBefs.push(whataf(
                    cjust,
                    templeUsq[templeLast], methods, 
                    resrownums, resultBef, resultsBefRowsNums, resultQ, 
                    befIlter, whereBef
                ));
                befRowsNum.push(resrownums);
            }
            else{
                const resrownums = [];
                templeBefs.push(whataf(
                    cjust, templeUsq[templeLast], methods, resrownums
                ));
                befRowsNum.push(resrownums);
            }
        }
        yeP++;
    }
    const tspl = templeBefs;
    let rtnV = "";
    if(templeLast > -1){
        rtnV = templeBefs[templeLast];
        retns[cjust] = rtnV;
    }
    retnsUsQsAndRowsNums[cjust] = [templeUsq[templeLast], befRowsNum[templeLast]]
    return rtnV;
}

function replaceLast(str, search, replace) {
    const pos = str.lastIndexOf(search);
    if (pos === -1) return str;
    return str.slice(0, pos) + replace + str.slice(pos + search.length);
}


function whataf(
    cjust="",
    responseInput = "",
    retnrows = [0, 0, 0, 0], 
    outResBefNums = [],
    befretns = [],
    befrownums=[],
    befusqs = [],
    befFilters=[],
    wherebef=[],
	szuroszlop=[],
	szur=""
){
    let fullText = "";
    const resHaveThead = responseInput.startsWith("T") ? 1 : 0;
    const leptek = responseInput.charCodeAt(1);
    const frameBefLiminal = 2;
    const resPlit = /*replaceLast(*/responseInput.substring(frameBefLiminal, responseInput.length)/*, columnSep + "\n", "")*/.split(columnSep);
    const error = responseInput.startsWith("err:") ? 1 : 0;
    outResBefNums.push(0);
    outResBefNums.push(0);
    // Fejléckiírás
    const eleje = wherebef[0];
    if(resHaveThead && retnrows[1] != 0){
        outResBefNums[0] = 1;
        fullText = aTF(
			retnrows[1](resPlit.slice(0, leptek), ...befretns.slice(eleje, wherebef[1]))
		);
        outResBefNums.push(fullText.length); // ALAMÉAEA
    }
    if(error == 0 && retnrows[0] != 0){
        for(let row = resHaveThead, i = resHaveThead * leptek; i < resPlit.length-1; row++, i += leptek){
           
		   const resultsBef = [];
            let qruak=1;
            for(let usqT = 0; usqT < eleje; usqT++){ // befs
                const memqruak = qruak;
                const qruakLiminal = befFilters[qruak-1] & 0b111111;  // FONTOS!
                const headTown = befFilters[qruak-1];
                const actualBef = befretns[usqT];
                const [needHdr, needBdy, needFtr] = [
                    ((headTown >> 31) & 1) == 0, 
                    ((headTown >> 30) & 1) == 0, 
                    ((headTown >> 29) & 1) == 0
                ];
                if(!needBdy){
                    const actualRowNums = befrownums[usqT];
                    let qru = "";
                    if(needHdr && (actualRowNums[0] & 1) == 1){
                        const textk = actualBef.substring(actualRowNums[1], actualRowNums[2]);
                        qru += textk;
                    }
                    if(needFtr && ((actualRowNums[0] >> 1) & 1) == 1){
                        const alen = actualRowNums.length - 1;
                        const textk = actualBef.substring(actualRowNums[alen - 1], actualRowNums[alen]);
                        qru += textk;
                    }
                    resultsBef.push(qru);
                    qruak+= qruakLiminal;
                }
                else if(headTown == qruakLiminal && !(befFilters.length > qruak-1 && qruakLiminal > 1)){
                    resultsBef.push(actualBef);
                    qruak++;
                }
                else{
                    let usqTrow=1;
                    let usqTitem=0;
                    let notHasNull=true;
                    
                    const actualRowNums = befrownums[usqT];
                    const qruakArray = [];
                    let memoryRef = (actualRowNums[0] & 1) == 1;
                    if(memoryRef){
                        if(needHdr) qruakArray.push(usqTrow);
                        else memoryRef = false;
                        usqTrow++;
                    }
                    
                    const resLast = resultsBef.push("")-1;

                    const usLeptek = befusqs[usqT].charCodeAt(1);
                    const fra = befusqs[usqT].split(columnSep);
                    const usqThaveHead = befusqs[usqT][0] == "T" ? 1 : 0;
					const checkResplitParts = [];

                    let checkResplit = "";
                    const honnmedd = Math.floor(qruakLiminal / 2);
                    
                    for(let qruak = memqruak; qruak < memqruak + honnmedd; qruak++){
                        const conc = resPlit[i + befFilters[qruak]];
                        notHasNull = conc.length > 0;
                        if(notHasNull) checkResplitParts.push(conc);
                    }
					checkResplit = checkResplitParts.join(columnSep);
                    const checkResplitLength = checkResplit.length;
                    const bUQIT = usqThaveHead * usLeptek;
                    if(actualBef.length > 0 && notHasNull){
                        for(
                           usqTrow, usqTitem = bUQIT;
                           usqTitem < fra.length - 1;
                           usqTrow++, usqTitem += usLeptek
                        ){
                            let ortami = true;
                            let checkFraParts = [];
                            const brase = usqTitem;
                            //const latr = qruak;
                            for(qruak = memqruak + honnmedd; qruak < memqruak + qruakLiminal-1; qruak++){ // befFilters
                                checkFraParts.push(fra[Number(brase + befFilters[qruak])]);
                            }
                            const checkFra = checkFraParts.join(columnSep);
                            ortami = checkResplitLength == checkFra.length && checkResplit === checkFra;
                            if(ortami != memoryRef){
                                qruakArray.push(usqTrow);
                                //Szétválasztás, csoportosítás
                                memoryRef = ortami;
                            }
                            qruak++;
                        }
                        if(bUQIT == usqTitem) qruak = memqruak + qruakLiminal;
                    }
                    else{
                        qruak += qruakLiminal;
                    }
                    const needFoot = needFtr;
                    if(usqTrow > 0 && (qruakArray.length & 1) == 1){

                        qruakArray.push(needFoot ? actualRowNums.length - 1 : usqTrow);
                    }
                    else if (needFoot && usqTrow < actualRowNums.length - 1){
                        for(let jk = 2; jk > 0; jk--) qruakArray.push(actualRowNums.length - jk);
                    }
                    let szen = "";
                    for(let qere = 0; qere < qruakArray.length; qere += 2){
                        szen += /*"\n"+qere+". "+ */actualBef.substring(
                            actualRowNums[qruakArray[qere]], 
                            actualRowNums[qruakArray[qere+1]]
                        );
                    }
                    if(!needFoot){
                    }
                    resultsBef[resLast] += szen;
                }
            }
            fullText += aTF(retnrows[0](resPlit.slice(i, i + leptek), ...resultsBef));
            outResBefNums.push(fullText.length);
        }
    }
    else if(retnrows[3] != 0){
        fullText += aTF(retnrows[3](resPlit.split(columnSep)));
        outResBefNums.push(fullText.length);
    }
    // tfoot
    if(retnrows[2]!=0) {
        outResBefNums[0] += 2;
        fullText += wherebef.length > 2 ? aTF(retnrows[2](
            ...befretns.slice(wherebef[1], wherebef[2])
        )) : aTF(retnrows[2]());
        outResBefNums.push(fullText.length);
    }
    return fullText;
}
