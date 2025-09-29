import { whd } from "./queriessetup.js";
import { retnCombinations } from "./retntemplates.js";
import { templates } from "./rowtemplates.js";

const columnSep = ":::";

export const exportedRetnMethods = {
    doFrissit: doFrissit,
    doUjratolt: doUjratolt,
    whataf: whataf
}

function doFrissit(retns){
    let result = "";
    for(let i = retns.length-1; i > -1 ; i--){
        let elozo = window.performance.now();
        const cja=retns[i].getAttribute("cjust");
        result = doUjratolt(cja);
        const start = performance.now();
        retns[i].innerHTML = result;
        requestAnimationFrame(() => {
            const end = performance.now();
            console.log(`Render + DOM update: ${end - start} ms`);
        });
    }
}

function doUjratolt(cjust="", responseInput=0){
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
        if(cja.length > 10){
            const methods = [];
            for(let i = 0; i < 8; i+=2){
                const metnum = Number("0x"+cja.substring(i,i+2));
                methods.push(!isNaN(metnum) && metnum != 255 ? templates[metnames[metnum]] : 0);
            }
            const reqType = Number("0x"+ cja.substring(9, 10));
            const reqNum = Number("0x"+ cja.substring(10, 12));
            if(!isNaN(reqType) && !isNaN(reqNum) && reqType < whd.length && reqNum<whd[reqType].length){
                templeUsq.push(
                    yeP==yelen && responseInput != 0 ? responseInput : whd[reqType][reqNum]
                );
                templeLast++;
            }
            else{
                break;
            }
            if(cja.length>13){
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
                            console.log("SPARTA")
                            resultBef.push(templeBefs[hirF]);
                            resultQ.push(templeUsq[hirF]);
                            resultsBefRowsNums.push(befRowsNum[hirF]);
                        }
                        else{
                            whereBef[lastResBefIndex]--; // Utolsó hiba: --2025. 08. 08. 15:46--
                        }
                        if(mata < 1){
                            befIlter.push(matre.length);
                            for(let mat = 1; mat < matre.length; mat++){
                                befIlter.push(isNaN(matre[mat]) ? matre[mat] : Number(matre[mat]));
                            }
                        }
                        befsNum++;
                    }
                    mata++;
                }
                templeBefs.push(whataf(
                    templeUsq[templeLast], methods, 
                    resrownums, resultBef, resultsBefRowsNums, resultQ, 
                    befIlter, whereBef
                ));
                befRowsNum.push(resrownums);
            }
            else{
                const resrownums = [];
                templeBefs.push(whataf(
                    templeUsq[templeLast], methods, resrownums
                ));
                befRowsNum.push(resrownums);
            }
        }
        yeP++;
    }
    return templeLast > -1 ? templeBefs[templeLast] : "";
}

function replaceLast(str, search, replace) {
    const pos = str.lastIndexOf(search);
    if (pos === -1) return str;
    return str.slice(0, pos) + replace + str.slice(pos + search.length);
}


function whataf(
    responseInput = "",
    retnrows = [0, 0, 0, 0], 
    outResBefNums = [],
    befretns = [],
    befrownums=[],
    befusqs = [],
    befFilters=[],
    wherebef=[]
){
    let fullText = "";
    const resHaveThead = responseInput.startsWith("T") ? 1 : 0;
    const leptek = responseInput.charCodeAt(1);
    const resPlit = replaceLast(responseInput.substring(2, responseInput.length), ":::\n", "").split(":::");
    const error = responseInput.startsWith("err:") ? 1 : 0;
    outResBefNums.push(false);
    outResBefNums.push(0);
    // Fejléckiírás
    const eleje = wherebef[0];
    if(resHaveThead && retnrows[1] != 0){
        outResBefNums[0] = true;
        fullText = retnrows[1](...befretns.slice(eleje, wherebef[1]), ...resPlit.slice(0, leptek));
        outResBefNums.push(fullText.length); // ALAMÉAEA
    }
    if(error == 0 && retnrows[0] != 0){
        for(let row = resHaveThead, i = resHaveThead * leptek; i < resPlit.length-1; row++, i+=leptek){
            const resultsBef = [];
            let qruak=1;
            for(let usqT = 0; usqT < eleje; usqT++){ // befs
                const memqruak = qruak;
                const qruakLiminal = befFilters[qruak-1];  // FONTOS!
                if(!(befFilters.length > qruak-1 && befFilters[qruak-1] > 1)){
                    resultsBef.push(befretns[usqT]);
                    qruak++;
                }
                else{
                    const actualBef = befretns[usqT];
                    const resLast = resultsBef.push(
                        befrownums[usqT][0] ? actualBef.substring(0, befrownums[usqT][1]) : ""
                    )-1;
                    const usLeptek = befusqs[usqT].charCodeAt(1);
                    const fra = befusqs[usqT].split(columnSep);
                    const qruakArray = [];
                    let memoryRef = false;
                    const usqThaveHead = befrownums[usqT][0] ? 1 : 0;
                    let usqTrow=0;
                    let usqTitem=0;

                    let checkResplit = "";
                    const honnmedd= Math.floor(qruakLiminal / 2);
                    for(let qruak = memqruak; qruak < memqruak + honnmedd; qruak++){
                        checkResplit += resPlit[i + befFilters[qruak]];
                    }
                    const checkResplitLength = checkResplit.length;
                    for(
                       usqTrow = 0, usqTitem = usqThaveHead * usLeptek;
                       usqTitem < fra.length-1;
                       usqTrow++, usqTitem+=usLeptek
                    ){
                        let ortami = true;
                        let checkFraParts = [];
                        const brase = usqTitem;
                        for(qruak = memqruak+honnmedd; qruak < qruakLiminal+1; qruak++){ // befFilters
                            checkFraParts.push(fra[brase + befFilters[qruak]]);
                        }
                        const checkFra = checkFraParts.join("");
                        ortami = checkResplitLength == checkFra.length && checkResplit === checkFra;
                        if(ortami != memoryRef){
                            qruakArray.push(usqTrow);
                            //Szétválasztás, csoportosítás
                            memoryRef = ortami;
                        }
                    }
                    console.log("Vége")
                    if(usqTrow>0 && qruakArray.length & 1 == 1) 
                        qruakArray.push(usqTrow)
                    ;
                    let szen = "";
                    for(let qere = 0; qere<qruakArray.length; qere+=2){
                        szen += "\n"+qere+". "+ actualBef.substring(
                            befrownums[usqT][qruakArray[qere]], 
                            befrownums[usqT][qruakArray[qere+1]]
                        );
                    }
                    resultsBef[resLast] += szen;
                }
            }
            fullText += retnrows[0](...resultsBef, ...resPlit.slice(i, i + leptek));
            outResBefNums.push(fullText.length)
        }
        // tfoot
        if(retnrows[2]!=0) {
            fullText += wherebef.length > 2 ? retnrows[2](
                ...befretns.slice(wherebef[1], wherebef[2])
            ) : retnrows[2]();
        }
    }
    else if(retnrows[3] != 0){
            fullText += retnrows[3](...resPlit.split(columnSep));
            outResBefNums.push(fullText.length)
    }
    return fullText;
}