import { exportedMethods } from "./globaldata.js";
import { mezok, defUrlap } from "./rowftemplates.js";

// RETNNNNNNNNNNNNNNNNNN
// https://www.youtube.com/watch?v=WjubCNND84w
const boreSplit = '<p class="inv">elva</p>';

function genGDivs(clist="", elements=[]){
	let kim = "<dg-div class='" + clist + "'>";
	for(let i = 0; i < elements.length; i++){
		kim += "<g-div TA='" + String.fromCharCode(i + 97) + "'><div>" + elements[i] + "</div></g-div>";
	}
	return kim + "</dg-div>";
}

const gComb = {
	cBL: "cBL-TA",
	cBLtrmk: "cBL-trmk-TA",
	megnTermekD: "megnTermek-TA", 
};

const mZF = {
	cBLtrmk: (...a) => {
		const gh = a[0]; // befilts
        let on = (gh?.length || 0) - 1;
        let both1 = true;
		let orhn = 0;
        for(;  both1 && on > -1; on--){
            both1 = gh[on] !== '<';
			if(!both1 && orhn < 2){
				orhn++;
				both1 = true;
			}
        }
        const sOnce = on > 0 ? doSplitOnce(gh, on + 1) : "";
		return `
\x00\x01dg-div class='cBL-trmk-TA'>
\x00\x00g-div TA='a'>${ sOnce[0] + "<br>" + a[1]/*a[3]*/ + sOnce[1] }
\x00\x00g-div TA='b' class='flec'>${ a[2]/*befilts[1]*/ }
\x00\x02
\x00\xFF`;
	}
};

const mTNs = {
    megnTermekT: ["Eszköznév", "Márka<br>Típus"],
    megnCegT: ["Cég neve"],
    customBeszerzesList: (a) => 
		[
			"Beszerzés Azonosító",
			genGDivs(gComb.cBLtrmk+"2",
				[
					mTNs.megnTermekT[0],
					mTNs.megnTermekT[1] +
					"<br>Gyártás éve",
					"Cég"
				]
			),
			genGDivs(gComb.cBL,
				[
					"Darabár",
					"Teljesítés intervalluma",
					"Mennyiség",
					"Beszerzési állapot",
					"<div class='nowrap'>Beszerzés</div>" +
					"<div class='nowrap'>Átvétel</div>"
				]
			)
],
    theadeHelyiseg2List: ["Azonosító | Helyiségtípus<br>Szint [ Név ]"],
    theadeLeltarList: () =>  [...mTNs.theadeHelyiseg2List, "Mennyiség"],
};

function doSplitOnce(str, pos) {
    return [str.slice(0, pos), str.slice(pos)];
}
const sampUpdate = (
	id=-1, 
	usqF=[], 
	mezok="", 
	insD=false, 
	kuldFelirat, 
	gombfelirat="Módosítás", 
	ctn="td"
)=>{
    const value = exportedMethods.getSchemTabValFromUsqF(usqF[0]);
	const ane = `
\x00\x01${ctn} class="film">
${ defUrlap(id, (usqF?.length > 1 ? usqF[1] : "1"), value, mezok, kuldFelirat, insD) }
\x00\x00button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">${gombfelirat}
\x00\x02
\x00\xFF`;
	return ane;
};


const sampDelete = (usqF, gombfelirat="Törlés", ctn="td") => {
	return `
\x00\x01${ ctn } class="film"
\x00\x01div class="scene scen scen1"
\x00\x00p>Biztos vagy benne?
\x00\x00button class="kuld" runsclick="\x04" value="${ 
	exportedMethods.getSchemTabValFromUsqF(usqF[0]) + "/" + usqF[1]
}">Igen
\x00\x00button runsclick="\x06" class="cancel" nextTo="scen:0">Mégse
\x00\x00p class="allapot"
\x00\x02button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">${ gombfelirat }
\x00\x02
\x00\xFF`;
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
        let ret = "<table><thead><tr>"+ koszbe +"</tr><tr>";
        for(let i = 0; i < args.length; i++){
            ret+="<th>"+args[i]+"</th>";
        }
        for(let i = 0; i< befTHlen; i++){
            ret += "<th></th>";
        }
        if(nFD.length > 0) ret += sampUpdate(undefined, nFD[0], nFD[1], true, nFD[2] || "Hozzáad", nFD[3] || "+", "th");
        ret+= "</tr></thead><tbody adj='afterbegin'>";
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
	nothing: (a, bef) => {
		console.log("Te ...: " + bef);
		return bef;
	},
    table: (args, retr="") => {
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
		return `
\x00\x00${cTn} class='c1${cTn != "td" ? " tcent" : ""}'>${ eszkoznev }
\x00\x00${cTn} class='c2 nowrap'>
	${markanev.length > 0 ? markanev : "-"}
	<br>${a3.length > 0 ? a3 : "-n/a-"}
\x00\xFF`;
    },
//    megnTermekD: (args, eszkoznev, markanev) => templates.megnTermekT(args, eszkoznev, markanev, "div"),
	megnTermekD: (a, eszkoznev, markanev) => genGDivs(
		gComb.megnTermekD,
		[
			eszkoznev,	
			`${markanev.length > 0 ? markanev : "-"}
			<br>${a[3].length > 0 ? a[3] : "-n/a-"}`
		]
	),
    megnCegT: (args) => "<td class='nowrap tcent'>" + args[1] + "</td>",
    megnHelyiseg: (a, helyisegtipus, emelet, cTn3="td", cTni3="div", cTn2="div", cTn="div") =>{
		return `
\x00\x01${ cTn3 } class='e1 l  megnhelyiseg'
\x00\x01${ cTni3 } class='e1 l  megnhelyiseg'
\x00\x01${ cTn2 } class='d1 lgridcol2 megnhelyiseg'
\x00\x00${ cTn } class='c1 tcent jlec'>${ a[1] }
\x00\x00${ cTn } class='c2 tcent'>${ helyisegtipus }
\x00\x02${ cTn2 } class='d2 tcent flec'>${ emelet }. emelet${ (a[7].length > 0 ? " [ " + a[7] + " ]" : "") }
\x00\x04
\x00\xFF
`;
    },
    tbodybef: (args) => "<tbody adj='afterbegin'>",
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
\x00\x01div class="film" style="
	position: absolute;
	top: ${args[3]}px;
	left: ${args[4]}px;"
\x00\x01ul class="grayblack liview scen"
\x00\x00li>Alakzatpontok
\x00\xFF ${ udMezC(args[0], [1], mezok.helyisegUpd(args, true), undefined, undefined, undefined, "li") }
\x00\x02button class='helyiseg' style="
	position: absolute;
	top: ${0}px;
	left: ${0}px;
	width: ${args[5]}px;
	height: ${args[6]}px;
	${ args[9] != "" ? "clip-path: polygon(" + args[9] + ");" : "" }"
\x00\x02
\x00\xFF`;
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
   		return `
\x00\x01tr class='retnrow'
\x00\x00td>${ args[0] }
\x00\xFF${ megnTermek }${ udMezC(args[0], [2], mezok.termekUpd(args)) }
\x00\x02
\x00\xFF`;
	},//otherUpd(args, [2], "termekUpd"),
    trowBeszerzesList: (args) => otherUpd(args, [3], "beszerzesUpd", `
\x00\x00td class="film"><button>Termék hozzáadása helyiséghez</button>
\x00\x00td class="film"><button>Leltár esemény regisztrálása</button>`),
    trowEmeletList: (args) => otherUpd(args, [4], "emeletUpd"),
    trowHelyisegList: (args) => otherUpd(args, [5], "helyisegUpd"),
    trowHelyiseg2List: (args, megnHelyiseg="") => 
		"<tr>" + megnHelyiseg + udMezC(args[0], [5], mezok.helyisegUpd(args))+"</tr>",
    trowLeltarList: (a, megnHelyiseg) => {
        return "\n\x00\x00tr>" + megnHelyiseg + "<td class='thcent'>" + a[3] + " db</td>";
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
        return justF.length > 2 ? templates.customBeszerzesList(a, ...res) : "";
    },
    customBeszerzesList: (a, helyiseg="", leltaresemeny="", hhead="", lehead="", tend="", ...befilts) => {
        let text = `
\x00\x01tr class='retnrow'
\x00\x00td>${a[0]}
\x00\x01td class='pad-uns'>${ mZF.cBLtrmk(befilts[0], a[3], befilts[1]) }
\x00\x03td class='pad-uns'>
\x00\x01dg-div class="${ gComb.cBL}"
\x00\x00g-div TA="a">${ a[6] + " Ft" }
\x00\x00g-div TA="b">${ !a[7] ? "Egyszeri" : a[7] }
\x00\x00g-div TA="c">${ a[4] + " db" }
\x00\x00g-div TA="d">${ a[5] == 0 ? "Új" : "Használt" }
\x00\x01g-div TA="e">
\x00\x01div
\x00\x00div class='nowrap'>B: ${a[8]}
\x00\x00div class='nowrap'>A: ${a[9]}
\x00\x09td
\x00\x01dg-div class="cBL-leltandleltes"
\x00\x01g-div TA="a"><!-- Leltár -->
\x00\x01select
\x00\x00option>li1
\x00\x05g-div TA="b"><!-- Leltáresemény -->
\x00\x01select
\x00\x00option>uli1
\x00\x05td
\x00\x01div class="g2 jfgrid">
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
\x00\x06
\x00\xFF`;
        const bon = ((helyiseg.length > 0 ? 1 : 0) & 1) ^ ((((leltaresemeny.length > 0 ? 1 : 0) & 1) << 1));
        let both = bon;
        let kieg = "";
        if(both > 0){
            kieg += '<tr><td colspan="'+ (a.length + 1) + '">';
            if((both & 1) != 0){
                kieg += "<h4>Helyiséghez hozzárendelve</h4><hr>" + hhead + helyiseg +  tend + "";
            }
            if((both & 2) != 0){
                kieg += "<h4>Leltáreseményben érintett</h4><hr>" + lehead + leltaresemeny + tend + "";
            }
            kieg+= '</td></tr>';
        }
        return text + kieg;
    },
    //
    // 2. customLeltarList
    //
    customLeltarList: (a, beszerzes,/* eszkozszukseglet, termekszukseglet, */ bhead, tend, ...befilts) => {
        let text = "<tr class='retnrow'>";
        let c = 0;
        const befs = [ // i
            
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < a.length-2; i++){
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
