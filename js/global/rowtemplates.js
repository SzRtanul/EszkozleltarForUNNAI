import { exportedMethods } from "./globaldata.js";
import { mezok, defUrlap } from "./rowftemplates.js";

// RETNNNNNNNNNNNNNNNNNN
// https://www.youtube.com/watch?v=WjubCNND84w
const boreSplit = '<p class="inv">elva</p>';

const mTNs = {
    megnTermekT: ["Eszköznév", "Márka/<br>Típus"],
    megnCegT: ["Cég neve"],
    customBeszerzesList: (a) => ["Beszerzés Azonosító", [mTNs.megnTermekT + "[" + "Gyártás éve" + "]", "Beszerzési Állapot" ]+ "/<br>Cég", "Mennyiség", "Darabár", "Teljesítés intervalluma", "Beszerzés/<br>Átvétel"],
    theadeHelyiseg2List: ["Azonosító | Helyiségtípus<br>Szint [ Név ]"],
    theadeLeltarList: () =>  [...mTNs.theadeHelyiseg2List, "Mennyiség"],
};

function doSplitOnce(str, pos) {
    return [str.slice(0, pos), str.slice(pos)];
}

const sampUpdate = (id=-1, usqF=[], mezok="", insD=false, kuldFelirat, gombfelirat="Módosítás", ctn="td")=>{
//    console.log(usqF);
    const value = exportedMethods.getSchemTabValFromUsqF(usqF[0]);
//    console.log("Con: " + value);
    return `
<${ctn} class="film">` + 
    defUrlap(id, (usqF?.length > 1 ? usqF[1] : "1"), value, mezok, kuldFelirat, insD) + 
    `<button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">
        ${gombfelirat}
    </button>
</${ctn}>`
};

const sampDelete = (usqF, gombfelirat="Törlés", ctn="td") => {
    return '<'+ctn+' class="film">' +
            '<div class="scene scen scen1">' +
                '<p>Biztos vagy benne?</p>' +
                '<button class="kuld" runsclick="\x04" value="' + exportedMethods.getSchemTabValFromUsqF(usqF[0]) + "/" + usqF[1] + '">Igen</button>' +
                '<button runsclick="\x06" class="cancel" nextTo="scen:0">Mégse</button>' +
                '<p class="allapot"></p>' +
            '</div>' +
            '<button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">'+ gombfelirat +'</button>' +
        '</' + ctn + '>';
};

const udMezC = (id, endptr, mezok="", ufg, df, ufk, cntnr) => { // Automatikusan update
    return sampUpdate(id, [endptr], mezok, undefined, ufk, ufg, cntnr) +
        sampDelete([endptr, id], df, cntnr);
}

const nevUp = (args, endptr, megj="") => {
    return templates.trow(args, udMezC(args[0], endptr, mezok.nevUpd(args, megj)));
};

const otherUpd = (args=[], usqF, myUpd="", egyebbf="", egyebbh="") => {
    return templates.trow(
        args,
        egyebbf +
        udMezC(usqF?.length > 1 ? args[usqF[1]] : args[0], usqF[0], mezok[myUpd](args)) +
        egyebbh
    );
};

const tempex = [
    (args, koszbe="", nFD=[], befTHlen=0)=>{
        console.log(args);
        console.log(koszbe)
        let ret = "<table><thead><tr>"+ koszbe +"</tr><tr>";
        for(let i = 0; i < args.length; i++){
            ret+="<th>"+args[i]+"</th>";
        }
        for(let i = 0; i< befTHlen; i++){
            ret += "<th></th>";
        }
        if(nFD.length > 0) ret += sampUpdate(undefined, nFD[0], nFD[1], true, nFD[2] || "Hozzáad", nFD[3] || "+", "th");
        ret+= "</tr></thead><tbody>";
        return ret;
    },
    (args=[], after="", classtext="")=>{
        let textout = "<ul class='"+ classtext +"'>";
        for(let i = 0; i < args.length; i++){
            textout += "<li>" + args[i] + after + "</li>";
        }
        textout += "</ul>"
        return textout;
    }
];

export const templates = {
    // Defaults
    table: (args, retr="") => {
        console.log(retr);
        return "<table>" +retr+ "</table>";
    },
    justF: () => {
        return "F";
    }, 
    theade: (args, koszbe, newFormData) => tempex[0](args, koszbe, newFormData),
    divheade: (args) => {
        let text = "<div class='fleft tbord'>";
        for(let i = 0; i < args.length; i++){
            text += "<div class='tbord'>" + args[i] + "</div>";
        }
        text += "</div>";
        return text;
    },
    arrlen: (args) => args.length + "",
    megn: (args) => args[1],
    megnTermek: (args, eszkoznev, markanev) => `${ eszkoznev } [${markanev} - ${args[3]}]`,
    megnTermekT: (args, eszkoznev, markanev, cTn="td") => {
        const a3 = args[3];
        return `<${cTn} class='c1${cTn != "td" ? " tcent" : ""}'>${ eszkoznev }</${cTn}>
        <${cTn} class='c2 nowrap'>
            ${markanev.length > 0 ? markanev : "-"}
            <br>${a3.length > 0 ? a3 : "-n/a-"}
        </${cTn}>`;
    },
    megnTermekD: (args, eszkoznev, markanev) => templates.megnTermekT(args, eszkoznev, markanev, "div"),
    megnCegT: (args) => "<td class='nowrap tcent'>" + args[1] + "</td>",
    megnHelyiseg: (a, helyisegtipus, emelet, cTn3="td", cTni3="div", cTn2="div", cTn="div") =>{
        return "<"+ cTn3 + " class='e1 pad-uns'><" + 
                cTni3 + " class='e1 l  megnhelyiseg'><" +
                    cTn2 + " class='d1 lgridcol2 megnhelyiseg'><"+ 
                        cTn + " class='c1 tcent jlec'>" + a[1] + "</"+ cTn + "><" +
                        cTn + " class='c2 tcent'>" + helyisegtipus+ "</"+ cTn + "></"+ cTn2 + ">"+
                    ("<" + cTn2 + " class='d2 tcent flec'>" + emelet + ". emelet" + (a[7].length > 0 ? " [ " + a[7] + " ]" : "")+ "</"+ cTn2 + ">") + 
                "</" + cTni3 + ">" +
            "</" + cTn3 + ">";
    },
    tbodybef: (args) => "<tbody>",
    //divbef: (args) => "",
    divbef: (args) => `<div>`,
    divend: (args) => "</div>",
    trow: (args, egyeb="", befilts =[], befs=[]) => {
        let ret = "<tr class='retnrow'>";
        if(befs.length == 0){
            for(let i = 0; i < args.length; i++){
                ret+="<td>"+args[i]+"</td>";
            }
        }
        else{
            let c = 0;
            for(let i = 0; i < args.length; i++){
                if(c < befs.length && befs[c] < i) c++;
                if(c < befs.length && befs[c] == i) ret += "<td>" + befilts[c] + "</td>"
                else ret += "<td>" + args[i] + "</td>";
            }
        }
        ret+= egyeb + "</tr>";
        return ret;
    },
    trowPro: (args) =>{
        return "";
    },
    tbodyend: (args) => "</tbody></table>",
    emelet: (args, helyisegek="")=>{
        return "<div style='position: relative;'>" + helyisegek + "</div>"
    },
    helyiseg: (args) => {
        return `
        <div class="film"
            style="
                position: absolute;
                top: ${args[3]}px;
                left: ${args[4]}px;
        ">
            <ul class="grayblack liview scen">
                <li>Alakzatpontok</li>
                ${
                    udMezC(args[0], [1], mezok.helyisegUpd(args, true), undefined, undefined, undefined, "li")
                }
            </ul>
            <button 
                class='helyiseg' 
                style="
                    position: absolute; 
                    /*top: calc(${args[3]}px * var(--scale-v)); 
                    left: calc(${args[4]}px * var(--scale-v)); 
                    width: calc(${args[5]}px * var(--scale-v)); 
                    height: calc(${args[6]}px * var(--scale-v)); */
                    top: ${0}px;
                    left: ${0}px;
                    width: ${args[5]}px;
                    height: ${args[6]}px;
                    ${ args[9] != "" ? "clip-path: polygon(" + args[9] + ");" : "" }
            "></button>
        </div>
        `
    },
    optionHead: () => "<option value=''></option>",
    optionList: (args, text=args[1], id=0) => "<option value=" + args[id] + ">"+ text + "</option>",
    // Customs
    theadeEszkozList: (args) => { 
        return tempex[0](
            [
                "Eszköz Azonosító",
                "Eszköznév",
                /*  "Márka",
                "Darabszám"*/
            ], undefined, [[12, 0], mezok.nevUpd(undefined, "Eszkoz neve")], 1
        );
    },
    theadeMarkaList: (args) => {
        return tempex[0](
            args,
            undefined, [[13, 0], mezok.nevUpd(undefined, "Márka")], 1
        );
    },
    theadeHelyisegTipusList: (args) => {
        return tempex[0](
            args,
            undefined, [[14, 0], mezok.nevUpd(undefined, "Helyiségtípus neve")], 1
        );
    },
    theadeLeltarEsemenyTipusList: (args) => {
        return tempex[0](
            args,
            undefined, [[15, 0], mezok.nevUpd(undefined, "Leltáresemény típus neve")], 1
        );
    },
    // ETTŐŐL
    theadeCegList: (args) => {
        return tempex[0](
            args,
            undefined, [[1, 0], mezok.cegUpd()], 1
        );
    },
    theadeTermekList: (args) => {
        return tempex[0](
            mTNs.megnTermekT,
            undefined, [[2, 0], mezok.termekUpd()], 1
        );
    },
    theadeBeszerzesList: (args) => { //
        return tempex[0](
            args,
            undefined, [[3, 0], mezok.beszerzesUpd()], 1
        );
    },
    theadeEmeletList: (args) => {
        return tempex[0](
            args,
            undefined, [[4, 0], mezok.emeletUpd()], 1
        );
    },
    theadeHelyisegList: (args) => {
        return tempex[0](
            args,
            undefined, [[5, 0], mezok.helyisegUpd()], 1
        );
    },
    theadeHelyiseg2List: (args) => {
        return tempex[0](
            mTNs.theadeHelyiseg2List,
            undefined, [[5, 0], mezok.helyisegUpd()], 1
        );
    },
    theadeLeltarList: (args) => { 
        return tempex[0](
            mTNs.theadeLeltarList(),
            undefined, [[6, 0], mezok.leltarUpd()], 1
        );
    },
    theadeLeltarEsemenyList: (args) => {
        return tempex[0](
            args,
            undefined, [[8, 0], mezok.leltarEsemenyUpd()], 1
        );
    },
    theadeFalList: (args) => {
        return tempex[0](
            args,
            undefined, [[7, 0], mezok.falUpd()], 1
        );
    },
    theadeTagozatList: (args) => {
        return tempex[0](
            args,
            undefined, [[9, 0], mezok.tagozatUpd()], 1
        );
    },
    theadeOsztalyList: (args) => {
        return tempex[0](
            args,
            undefined, [[10, 0], mezok.osztalyUpd()], 1
        );
    },
    theadeTeremKiosztasList: (args) => {
        return tempex[0](
            args,
            undefined, [[11, 0], mezok.teremKiosztasUpd()], 1
        );
    },
    theadeEszkozSzuksegletList: (args) => {
        return tempex[0](
            args,
            undefined, [[16, 0], mezok.eszkozSzuksegletUpd()], 1
        );
    },
    theadeTermekSzuksegletList: (args) => {
        return tempex[0](
            args,
            undefined, [[17, 0], mezok.termekSzuksegletUpd()], 1
        );
    },
    theadeTervrajz: (args) => {
        return "";
    },
    theadeCustomLeltarList:(a) => templates.theade(a.slice(0, a.length - 2)),
    optionCegList: (args) => templates.optionList(args, args[1]),
    optionTermekList: (args, markanev="", eszkoznev="") => templates.optionList(args, `${ eszkoznev } [${markanev} - ${args[3]}]`),
    optionBeszerzesList: (args) => templates.optionList(args, args[1]),
    optionEmeletList: (args) => templates.optionList(args, args[1]),
    optionHelyisegList: (args) => templates.optionList(args, args[1]),
    optionLeltarList: (args) => templates.optionList(args, args[1]),
    optionLeltarEsemenyList: (args) => templates.optionList(args, args[1]),
    optionFalList: (args) => templates.optionList(args, args[1]),
    optionTagozatList: (args) => templates.optionList(args, args[1]),
    optionOsztalyList: (args) => templates.optionList(args, args[1]),
    optionTeremKiosztasList: (args) => templates.optionList(args, args[1]),
    trowEszkozList: (args) => nevUp(args, 12, "Eszköz neve"),
    trowMarkaList: (args) => nevUp(args, 13, "Márka"),
    trowHelyisegTipusList: (args) => nevUp(args, 14, "Helyiség neve"),
    trowLeltarEsemenyTipusList: (args) => nevUp(args, 15, "Leltáresemény típus neve"),
    trowCegList: (args) => otherUpd(args, [1], "cegUpd"),
    trowTermekList: (args, megnTermek) => {
        return "<tr class='retnrow'><td>" + args[0] + "</td>" + megnTermek + "" + udMezC(args[0], [2], mezok.termekUpd(args))+"</tr>";
    },//otherUpd(args, [2], "termekUpd"),
    trowBeszerzesList: (args) => otherUpd(args, [3], "beszerzesUpd", `
<td class="film"><button>Termék hozzáadása helyiséghez</button></td>
<td class="film"><button>Leltár esemény regisztrálása</button></td>
`),
    trowEmeletList: (args) => otherUpd(args, [4], "emeletUpd"),
    trowHelyisegList: (args) => otherUpd(args, [5], "helyisegUpd"),
    trowHelyiseg2List: (args, megnHelyiseg="") => "<tr>" + megnHelyiseg + udMezC(args[0], [5], mezok.helyisegUpd(args)) +"</tr>",
    trowLeltarList: (a, megnHelyiseg) => {
        return "<tr>" + megnHelyiseg + "<td class='thcent'>" + a[3] + " db</td></tr>";
    },//otherUpd(args, [6], "leltarUpd"),
    //
    trowLeltarEsemenyList: (args) => otherUpd(args, [8], "leltarEsemenyUpd"),
    trowFalList: (args) => otherUpd(args, [7, 4], "falUpd"),
    trowTagozatList: (args) => otherUpd(args, [9], "tagozatUpd"),
    trowOsztalyList: (args) =>otherUpd(args, [10], "osztalyUpd"),
    trowTeremKiosztasList: (args) => otherUpd(args, [11], "teremKiosztasUpd"),
    trowEszkozSzuksegletList: (args) => otherUpd(args, [16], "eszkozSzuksegletUpd"),
    trowTermekSzuksegletList: (args) => otherUpd(args, [17], "termekSzuksegletUpd"),
    trowleLeltarList: (a) => templates.trow(
        a,
        udMezC(a[6],
            6,
            mezok.leltarUpd(
                [a[0], a[1]], 
                true
            )
        )
    ),
    trowleLeltarEsemenyList: (a, ...befilts) => {
        const templ = templates.trow(
            a,
            udMezC(
                [a[0], a[1]],
                8,
                mezok.leltarEsemenyUpd(
                    [a[0], a[1]], 
                    true
                )
            ),
            befilts, 
            [2], [0]
        );
        //console.log(templ)
        return templ;
    },
    trowleBeszerzesList: (a) => templates.trow(
        a,
        "<td class='g1 jfgrid'>" +
        udMezC(
            [a[0], a[1]],
            7,
            mezok.leltarUpd(
                [a[0], a[1]], 
                true
            ),
            undefined,
            undefined,
            undefined,
            "div"
        ) + "</td>"
    ),
    theadleBeszerzesList: (a) => {
        const bef = `<td colspan="${a.length-1}"></td>`;
        return templates.theade(mTNs.customBeszerzesList(a));
    },
    theadleHelyisegList: (a) => {
        const bef = `<td colspan="${a.length-1}"></td>`;
        return templates.theade(a.slice(0, a.length - 2));
    },
    //
    // 1. customBeszerzesList
    //
    customBeszerzesList2: (a, justF="", ...res) => {
        console.log("Zsuuuuuuuuuuuuuuuu");
        console.log([justF, ...res]);
        return justF.length > 2 ? templates.customBeszerzesList(a, ...res) : "";
    },
    customBeszerzesList: (a, helyiseg="", leltaresemeny="", hhead="", lehead="", tend="", ...befilts) => {
        //console.log("Befilts:");
//        console.log(befilts)
        console.log("ÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁ: ");
        console.log([helyiseg, leltaresemeny, hhead, lehead, tend, ...befilts]);
        let text = "<tr class='retnrow'>";
        let c = 0;
        let nv = 0;
        let ntd = 0;

        const endpoint = "";
//        console.log("TARRRRRR: " + helyiseg)
        const noWrap = [

        ];
        const isTD = [

        ];

        const befs = [ // i
            1, 3
        ];
        const befous = [ // befilts
            0, 1
        ];
        const gh =  befilts[0];
        let on = (gh?.length || 0) - 1 ;
        let both1 = true;
        for(;  both1 && on > -1; on--){
            console.log("On: " + on)
            both1 = gh[on] !== '<';
        }
        const sOnce = on > 0 ? doSplitOnce(gh, on + 1) : "";
        console.log("sOnce: " + sOnce[0]);
        text+= "<td>" + a[0] + "</td><td class='pad-uns'" +
            "" +
            "><div class='l'><div class='cr'>" + sOnce[0] + "  [" + a[3] + "]" + sOnce[1] + "<div class='tcent'>" + (a[5] == 0 ? "Új" : "Használt") + "</div></div>" +
            "<d-maxW class='dp tcent flec'>" + befilts[1] + "</d-maxW>" +
            "</div></td>" +
        `<td>
			<div class="cBL-TA">
				<g-div TA="a">${ a[6] } Ft</g-div>
				<g-div TA="b">${ !a[7] ? "Egyszeri" : a[7] }</g-div>
				<g-div TA="c"> ${a[4]} db</g-div>
				<g-div TA="d">
					<div class='nowrap'>${a[8]}</div>
					<div class='nowrap'>${a[9]}</div>
				</g-div>
			</div>
		</td>
   <td>
		<div class="g2 jfgrid">
			${
				sampUpdate(
					a[0], [6, 0],
					mezok.leltarUpd(a, true),
					true, "Hozzáad",
					"Termék hozzárendelése Helyiséghez",
					"div"
				)
			}
			${
				sampUpdate(
					a[0], [8, 0],
					mezok.leltarEsemenyUpd(a, true),
					true, "Hozzáad",
					"Leltáresemény hozzáadása",
					"div"
				)
			}
			${
				udMezC(
					a[0], 3, mezok.beszerzesUpd(a),
					"Beszerzés Módosítása",
					"Beszerzés Törlése",
					undefined, "div"
				)
			}
		</div>
    </td>
</tr>`;
//        console.log(helyiseg.length);
//        console.log(leltaresemeny.length);
//        console.log(tend);

        const bon = ((helyiseg.length > 0 ? 1 : 0) & 1) ^ ((((leltaresemeny.length > 0 ? 1 : 0) & 1) << 1));
        let both = bon;
//        console.log("Bon: "+bon);
        let kieg = "";
        if(both > 0){
            kieg += '<tr><td colspan="'+ (a.length + 1) + '">';
            if((both & 1) != 0){
//                console.log("trate: " + hhead)
                kieg += "<h4>Helyiséghez hozzárendelve</h4><hr>" + hhead + helyiseg +  tend + "";
            }
            //            console.log("Azon!");
            //            console.log(bon);
            //            console.log(both & 2)
            //            console.log((both & 2) != 0);
            if((both & 2) != 0){
//                console.log("trat: " + lehead)
                kieg += "<h4>Leltáreseményben érintett</h4><hr>" + lehead + leltaresemeny + tend + "";
            }
            kieg+= '</td></tr>';
        }
//        console.log("HJ: " + lehead + leltaresemeny + "</tbody></table>")
        return text + kieg;
    },
    //
    // 2. customLeltarList
    //
    customLeltarList: (a, beszerzes,/* eszkozszukseglet, termekszukseglet, */ bhead, tend, ...befilts) => {
//        console.log("Befilts:");
//        console.log(befilts);
        let text = "<tr class='retnrow'>";
        let c = 0;
        const befs = [ // i
            
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < a.length-2; i++){
            console.log("C: " + c);
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += "<td>"/* + a[i] + ": " */+ befilts[befous[c]] + "</td>"
            else text += "<td>" + a[i] + "</td>";
        }
        // <td>Leltárbejegyzés frissítése</td><td>Leltárbejegyzés törlése</td>
        text += `
    <td class="g2 jfgrid">
        ${
            udMezC(
                a[0], 5,
                mezok.helyisegUpd(a, false),
                "Helyiség adatainak frissítése",
                "Helyiség Törlése",
                undefined, "div"
            )
        }
        ${
            sampUpdate(
                a[0], [16, 0],
                mezok.eszkozSzuksegletUpd(a, true),
                true, "Hozzáad",
                "Eszközszükséglet hozzáadása",
                "div"
            )
        }
        ${
            sampUpdate(
                a[0], [17, 0],
                mezok.termekSzuksegletUpd(a, true),
                true, "Hozzáad",
                "Termékszükséglet hozzáadása",
                "div"
            )
        }
    </td>
</tr>`;
        let kieg = "";
        if(beszerzes.length > 0){
            kieg += 
                '<tr><td colspan="'+ a.length + '">' +
                '<h4>Hozzárendelt tárgyak</h4><hr>' + 
                    bhead + beszerzes + tend + 
                '</td></tr>';
        }
        return text + kieg;
    },
};
