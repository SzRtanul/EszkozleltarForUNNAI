import { mezok } from "./rowftemplates.js";

// RETNNNNNNNNNNNNNNNNNN
const boreSplit = '<p class="inv">elva</p>';

const defUrlap = (id="", usqf="", value="", fields="", kuldFelirat="Hozzáad") => `
<form runssubmit="\x01" usqf="${usqf}" value="update/${value}" nextTo="" class="scene scen scen1">
    <div>
        <label>Id</label>
        <input type="number" value="${id}" disabled class="">
        ${fields}
    </div>
    <p>
        <button type="button" class="aktuel">
            <img src="" class="">
        </button>
        <button type="button" class="cancel" runsclick="\x06" nextTo="scen:0">Mégse</button>
        <input type="submit" value="${kuldFelirat}" class="but">
    </p>
    <span class="allapot"></span>
</form>
`;

const sampUpdate = (args, usqf="", value="", mezok="", kuldFelirat="Hozzáad")=>{
    return `
<td class="film">` + 
    defUrlap(args[0], usqf, value, mezok, kuldFelirat) + 
    `<button runsclick="\x06" nextTo="scen:1" class="scene scen scen0 sceneI">
        Módosítás
    </button>
</td>`
};

const sampDelete = (schematableargs="") => {
    return '<td><button runsclick="\x04" value="' + schematableargs + '">Törlés</button></td>'
};

const nevUp = (args, endpoint="", megj="") => {
    return templates.trow(
        args,
        sampUpdate(args, "1", endpoint, mezok.nevUpd(args, megj)) +
        sampDelete(endpoint)
    );
};

const otherUpd = (args=[], endpoint, myUpd="", egyebbf="", egyebbh="") => {
    return templates.trow(
        args,
        egyebbf +
        sampUpdate(args, "1", endpoint, mezok[myUpd](args)) +
        sampDelete(endpoint) +
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
    theade: (args) => tempex[0](args),
    divheade: (args) => {
        let text = "<div class='fleft tbord'>";
        for(let i = 0; i < args.length; i++){
            text += "<div class='tbord'>" + args[i] + "</div>";
        }
        text += "</div>";
        return text;
    },
    megn: (args) => args[1],
    megnTermek: (args) => args[3],
    tbodybef: (args) => "<tbody>",
    //divbef: (args) => "",
    divbef: (args) => `<div>`,
    divend: (args) => "</div>",
    trow: (args, egyeb="") => {
        let ret = "<tr class='retnrow'>";
        for(let i = 0; i < args.length; i++){
            ret+="<td>"+args[i]+"</td>";
        }
        ret+= egyeb + "</tr>";
        return ret;
    },
    trowPro: () =>{
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
    trowEszkozList: (args) => {
        return nevUp(args, "megnevezes/eszkoz_v/"+args[0], "Eszköz neve");
    },
    trowMarkaList: (args) => {
        return nevUp(args, "megnevezes/marka/"+args[0], "Márka");
    },
    trowHelyisegTipusList: (args) => {
        return nevUp(args, "megnevezes/helyisegtipus/"+args[0], "Eszköz neve");
    },
    trowLeltarEsemenyTipusList: (args) => {
        return nevUp(args, "megnevezes/leltaresemenytipus/"+args[0], "Eszköz neve");
    },
    trowCegList: (args) => {
        return otherUpd(args, "public/ceg/"+args[0], "cegUpd");
    },
    trowTermekList: (args) => {
        return templates.trow(
            args,
            sampUpdate(args, "1", "public/termek/"+args[0], mezok.termekUpd(args)) +
            sampDelete("public/termek/"+args[0])
        );
    },
    trowBeszerzesList: (args) => {
        return otherUpd(
            args,
            "public/beszerzes/"+args[0],
            "beszerzesUpd",
`
<td class="film"><button>Termék hozzáadása helyiséghez</button></td>
<td class="film"><button>Leltár esemény regisztrálása</button></td>
`
        );
    },
    trowEmeletList: (args) => {
        return otherUpd(args, "epulet/emelet/"+args[0], "emeletUpd");
    },
    trowHelyisegList: (args) => {
        return otherUpd(args, "epulet/helyiseg/"+args[0], "helyisegUpd");
    },
    trowLeltarList: (args) => {
        return otherUpd(args, "public/leltar/"+args[0], "leltarUpd");
    },
    trowLeltarEsemenyList: (args) => {
        return otherUpd(args, "public/leltaresemeny/"+args[0], "leltarEsemenyUpd");
    },
    trowFalList: (args) => {
        return otherUpd(args, "public/fal/"+args[0], "falUpd");
    },
    trowTagozatList: (args) => {
        return otherUpd(args, "public/tagozat/"+args[0], "tagozatUpd");
    },
    trowOsztalyList: (args) => {
        return otherUpd(args, "public/osztaly/"+args[0], "osztalyUpd");
    },
    trowTeremKiosztasList: (args) => {
        return otherUpd(args, "public/teremkiosztas/"+args[0], "teremKiosztasUpd");
    },
    customBeszerzesList: (args, helyiseg, leltaresemeny, ...befilts) => {
        console.log("Befilts:");
        console.log(befilts)
        let text = "<tr class='retnrow'>";
        let c = 0;
        console.log("TARRRRRR: " + helyiseg)
        const befs = [ // i
            
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < args.length; i++){
            console.log("C: " + c)
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += "<td>"/* + args[i] + ": " */+ befilts[befous[c]] + "</td>"
            else text += "<td>" + args[i] + "</td>";
        }
        text += `
    <td class='tbord'>Hozzárendelés helyiséghez</td>
    <td class='tbord'>Leltáresemény regisztrálása</td>
</tr>
`;
        return `
${text}
<tr>
    <td colspan="${ "12" }">
        <h4>Helyiséghez hozzárendelve</h4>
        ${helyiseg}
        <h4>Leltáreseményben érintett</h4>
        ${leltaresemeny}
        <hr>
    </td>
</tr>`;
    },
    custom2BeszerzesList: (args, helyiseg, leltaresemeny, ...befilts) => {
        let text = "<div class='retnrow fleft tbord'>";
        let c = 0;
        console.log("TARRRRRR: " + helyiseg)
        const befs = [ // i
            1, 3
        ];
        const befous = [ // befilts
            0, 1
        ];
        for(let i = 0; i < args.length; i++){
            if(c < befs.length && befs[c] < i) c++;
            if(c < befs.length && befs[c] == i) text += "<div class='tbord'>" + befilts[befous[c]] + "</div>"
            else text += "<div class='tbord'>" + args[i] + "</div>";
        }
        text += `
    <div class='tbord'>Hozzárendelés helyiséghez</div>
    <div class='tbord'>Leltáresemény regisztrálása</div>
</div>
`;
        return `
<div>
        ${text}
        <h4>Helyiséghez hozzárendelve</h4>
        ${helyiseg}
        <h4>Leltáreseményben érintett</h4>
        ${leltaresemeny}
        <hr>
</div>
        `;
    }
};