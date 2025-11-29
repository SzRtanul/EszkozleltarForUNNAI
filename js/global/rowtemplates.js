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
    tbodybef: (args) => "<tbody>",
    divbef: (args) => "",
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
                ${ args[9] != "null" ? "clip-path: polygon(" + args[9] + ");" : "" }
            "></button>`
    },
    optionList: (args) => "<option value=" + args[0] + ">"+ args[1]+"</option>",
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
    trowEszkozList: (args) => {
        return templates.trow(
            args,
            sampUpdate(args, "1", "megnevezes/eszkoz_v/"+args[0], mezok.nevUpd(args, "Eszköz neve")) +
            sampDelete("megnevezes/eszkoz_v/"+args[0])
        );
    },
    trowTermekList: (args) => {
        return templates.trow(
            args,
            sampUpdate(args, "1", "public/termek/"+args[0], mezok.termekUpd(args)) +
            sampDelete("public/termek/"+args[0])
        );
    },
    
};