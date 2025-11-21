// RETNNNNNNNNNNNNNNNNNN
const boreSplit = '<p class="inv">elva</p>';

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
    trow: (args, egyeb="") => {
        let ret = "<tr class='retnrow'>";
        for(let i = 0; i < args.length; i++){
            ret+="<td>"+args[i]+"</td>";
        }
        ret+= egyeb + "</tr>";
        return ret;
    },
    tbodyend: (args) => "</tbody></table>",
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
            `
                <td><button runsclick="\x04" value="megnevezes/eszkoz/${args[0]}">Törlés</button></td>
                <td><button runsclick="\x05" value="und/und/${args[0]}">Változtatás</button></td>
            `
        );
    },
};