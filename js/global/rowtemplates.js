import { mezok, defUrlap } from "./rowftemplates.js";

// RETNNNNNNNNNNNNNNNNNN
// https://www.youtube.com/watch?v=WjubCNND84w
const boreSplit = '<p class="inv">elva</p>';

const sampUpdate = (id=-1, usqf="", value="", mezok="", insD, kuldFelirat, gombfelirat="Módosítás", ctn="td")=>{
    return `
<${ctn} class="film">` + 
    defUrlap(id, usqf, value, mezok, kuldFelirat, insD) + 
    `<button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">
        ${gombfelirat}
    </button>
</${ctn}>`
};

const sampDelete = (schematableargs="", gombfelirat="Törlés", ctn="td") => {
    return '<'+ctn+'><button runsclick="\x04" value="' + schematableargs + '">'+ gombfelirat +'</button></' + ctn + '>';
};

const udMezC = (id, endpoint, mezok="", ufg, df, ufk, cntnr) => { // Automatikusan update
    return sampUpdate(id, "1", endpoint, mezok, undefined, ufk, ufg, cntnr) +
        sampDelete(endpoint, df, cntnr);
}

const nevUp = (args, endpoint="", megj="") => {
    return templates.trow(args, udMezC(args[0], endpoint, mezok.nevUpd(args, megj)));
};

const otherUpd = (args=[], endpoint, myUpd="", egyebbf="", egyebbh="") => {
    return templates.trow(
        args,
        egyebbf +
        udMezC(args[0], endpoint, mezok[myUpd](args)) +
        egyebbh
    );
};

const tempex = [
    (args, koszbe="")=>{
        let ret = "<table><thead><tr>"+ koszbe +"</tr><tr>";
        for(let i = 0; i < args.length; i++){
            ret+="<th>"+args[i]+"</th>";
        }
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
    theade: (args, koszbe) => tempex[0](args, koszbe),
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
    megnTermek: (args) => args[3],
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
        return `<button 
            class='helyiseg' 
            style="
                position: absolute; 
                /*top: calc(${args[3]}px * var(--scale-v)); 
                left: calc(${args[4]}px * var(--scale-v)); 
                width: calc(${args[5]}px * var(--scale-v)); 
                height: calc(${args[6]}px * var(--scale-v)); */
                top: ${args[3]}px;
                left: ${args[4]}px;
                width: ${args[5]}px;
                height: ${args[6]}px;
                ${ args[9] != "" ? "clip-path: polygon(" + args[9] + ");" : "" }
            "></button>`
    },
    optionHead: ()=> "<option value=''></option>",
    optionList: (args, text=args[1], id=0) => "<option value=" + args[id] + ">"+ text + "</option>",
    // Customs
    theadeEszkozList: (args) => { 
        return templates.theade(
            [
                "Eszköz Azonosító",
                "Eszköznév",
                /*  "Márka",
                "Darabszám"*/
            ]
        );
    },
    theadeTeremList: (args) => {
        return templates.theade(
            [
                "Terem száma", 
                "Terem",
                "Terem típusa"
            ]
        );
    },
    theadeLeltarList: (args) => {
        return templates.theade(
            [
                "Terem száma", 
                "Terem",
                "Eszköz leltári száma",
                "Eszköz",
                "Márka",
                "Darabszám"
            ]
        );
    },
    optionCegList: (args) => templates.optionList(args, args[1]),
    optionTermekList: (args) => templates.optionList(args, args[1]),
    optionBeszerzesList: (args) => templates.optionList(args, args[1]),
    optionEmeletList: (args) => templates.optionList(args, args[1]),
    optionHelyisegList: (args) => templates.optionList(args, args[1]),
    optionLeltarList: (args) => templates.optionList(args, args[1]),
    optionLeltarEsemenyList: (args) => templates.optionList(args, args[1]),
    optionFalList: (args) => templates.optionList(args, args[1]),
    optionTagozatList: (args) => templates.optionList(args, args[1]),
    optionOsztalyList: (args) => templates.optionList(args, args[1]),
    optionTeremKiosztasList: (args) => templates.optionList(args, args[1]),
    trowEszkozList: (args) => nevUp(args, "megnevezes/eszkoz_v/"+args[0], "Eszköz neve"),
    trowMarkaList: (args) => nevUp(args, "megnevezes/marka/"+args[0], "Márka"),
    trowHelyisegTipusList: (args) => nevUp(args, "megnevezes/helyisegtipus/"+args[0], "Eszköz neve"),
    trowLeltarEsemenyTipusList: (args) => nevUp(args, "megnevezes/leltaresemenytipus/"+args[0], "Eszköz neve"),
    trowCegList: (args) => otherUpd(args, "public/ceg/"+args[0], "cegUpd"),
    trowTermekList: (args) => otherUpd(args, "public/termek/" + args[0], "termekUpd"),
    trowBeszerzesList: (args) => otherUpd(
        args,
        "public/beszerzes/"+args[0],
        "beszerzesUpd",
`
<td class="film"><button>Termék hozzáadása helyiséghez</button></td>
<td class="film"><button>Leltár esemény regisztrálása</button></td>
`),
    trowEmeletList: (args) => otherUpd(args, "epulet/emelet/"+args[0], "emeletUpd"),
    trowHelyisegList: (args) => otherUpd(args, "epulet/helyiseg/"+args[0], "helyisegUpd"),
    trowLeltarList: (args) => otherUpd(args, "public/leltar/"+args[0], "leltarUpd"),
    trowLeltarEsemenyList: (args) => otherUpd(args, "public/leltaresemeny/"+args[0], "leltarEsemenyUpd"),
    trowFalList: (args) => otherUpd(args, "public/fal/"+args[0], "falUpd"),
    trowTagozatList: (args) => otherUpd(args, "public/tagozat/"+args[0], "tagozatUpd"),
    trowOsztalyList: (args) =>otherUpd(args, "public/osztaly/"+args[0], "osztalyUpd"),
    trowTeremKiosztasList: (args) => otherUpd(args, "public/teremkiosztas/"+args[0], "teremKiosztasUpd"),
    trowleLeltarList: (a) => templates.trow(
        a,
        udMezC(
            [a[0], a[1]],
            "public/leltar",
            mezok.leltarUpd(
                [a[0], a[1]], 
                true
            )
        )
    ),
    trowleLeltarEsemenyList: (a, ...befilts) => templates.trow(
        a,
        udMezC(
            [a[0], a[1]],
            "public/leltar",
            mezok.leltarUpd(
                [a[0], a[1]], 
                true
            )
        ),
        befilts, 
        [2], [0]
    ),
    trowleBeszerzesList: (a) => templates.trow(
        a,
        "<td class='g1 jfgrid'>" +
        udMezC(
            [a[0], a[1]],
            "public/leltaresemeny",
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
        return templates.theade(a);
    },
    theadleHelyisegList: (a) => {
        const bef = `<td colspan="${a.length-1}"></td>`;
        return templates.theade(a);
    },
    //
    // 1. customBeszerzesList
    //
    customBeszerzesList: (a, helyiseg, leltaresemeny, hhead="", lehead="", tend="", ...befilts) => {
        console.log("Befilts:");
        console.log(befilts)
        let text = "<tr class='retnrow'>";
        let c = 0;
        const endpoint = "";
        console.log("TARRRRRR: " + helyiseg)
        const befs = [ // i
            
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < a.length; i++){
            console.log("C: " + c)
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += "<td>"/* + a[i] + ": " */+ befilts[befous[c]] + "</td>"
            else text += "<td>" + a[i] + "</td>";
        }
        text += `
    <td class="g2 jfgrid">
        ${
            sampUpdate(
                a[0], "0",
                "public/leltar/"+a[0],
                mezok.leltarUpd(a, true),
                true, "Hozzáad",
                "Termék hozzárendelése Helyiséghez",
                "div"
            )
        }
        ${
            sampUpdate(
                a[0], "0", 
                "public/leltaresemeny/"+a[0],
                mezok.leltarEsemenyUpd(a, true),
                true, "Hozzáad",
                "Leltáresemény hozzáadása",
                "div"
            )
        }
        ${
            udMezC(
                a[0],
                "public/beszerzes/" + a[0],
                mezok.beszerzesUpd(a),
                "Beszerzés Módosítása",
                "Beszerzés Törlése",
                undefined, "div"
            )
        }
    </td>
</tr>
`;
        console.log(helyiseg.length);
        console.log(leltaresemeny.length);
        console.log(tend);

        const bon = ((helyiseg.length > 0 ? 1 : 0) & 1) ^ ((((leltaresemeny.length > 0 ? 1 : 0) & 1) << 1));
        let both = bon;
        console.log("Bon: "+bon);
        let kieg = "";
        if(both > 0){
            kieg += '<tr><td colspan="'+ a.length + '">';
            if((both & 1) != 0){
                kieg += "<h4>Helyiséghez hozzárendelve</h4><hr>" + hhead + helyiseg + tend + "";
            }
            console.log("Azon!");
            console.log(bon);
            console.log(both & 2)
            console.log((both & 2) != 0);
            if((both & 2) != 0){
                kieg += "<h4>Leltáreseményben érintett</h4><hr>" + lehead + leltaresemeny + tend + "";
            }
            kieg+= '</td></tr>';
        }
        console.log("HJ: " + lehead + leltaresemeny + "</tbody></table>")
        return text + kieg;
    },
    //
    // 2. customLeltarList
    //
    customLeltarList: (a, beszerzes, bhead, tend, ...befilts) => {
        console.log("Befilts:");
        console.log(befilts)
        let text = "<tr class='retnrow'>";
        let c = 0;
        const befs = [ // i
            
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < a.length; i++){
            console.log("C: " + c)
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += "<td>"/* + a[i] + ": " */+ befilts[befous[c]] + "</td>"
            else text += "<td>" + a[i] + "</td>";
        }
        // <td>Leltárbejegyzés frissítése</td><td>Leltárbejegyzés törlése</td>
        text += `
    <td class="g2 jfgrid">
        ${
            sampUpdate(
                a[0], "0", 
                "public/leltaresemeny/"+a[0],
                mezok.leltarEsemenyUpd(a, true),
                true, "Hozzáad",
                "Leltárbejegyzés Hozzáadása",
                "div"
            )
        }
        ${
            udMezC(
                a[0], 
                "public/beszerzes/" + a[0],
                mezok.beszerzesUpd(a),
                "Helyiség adatainak frissítése",
                "Helyiség Törlése",
                undefined, "div"
            )
        }
    </td>
</tr>`;
        let kieg = "";
        if(beszerzes.length > 0){
            kieg+= 
                '<tr><td colspan="'+ a.length +'">' +
                '<h4>Hozzárendelt tárgyak</h4><hr>' + 
                bhead + beszerzes + tend + 
                '</td></tr>';
        }
        return text + kieg;
    },
};
