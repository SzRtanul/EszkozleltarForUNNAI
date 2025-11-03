// RETNNNNNNNNNNNNNNNNNN
const boreSplit = '<p class="inv">elva</p>';

const tempex = [
    (args, koszbe="")=>{
        let ret = "<thead><tr>"+ koszbe +"</tr><tr>";
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
    theade: (...args) => tempex[0](args),
    tbodybef: () => "<tbody>",
    tablerow: (...args) => {
        let ret = "<tr>";
        for(let i = 0; i < args.length; i++){
            ret+="<td>"+args[i]+"</td>";
        }
        ret+= "</tr>";
        return ret;
    },
    tbodyend: () => "</tbody>",
    //With Custom Column names
    theadeEszkozList: () =>{
        return templates.theade(
            "Eszköz Azonosító",
            "Eszköznév",
            "Márka",
            "Darabszám"
        );
    },
    theadeTeremList: () =>{
        return templates.theade(
            "Terem száma", 
            "Terem",
            "Terem típusa"
        );
    },
    theadeLeltarList: () =>{
        return templates.theade(
            "Terem száma", 
            "Terem",
            "Eszköz leltári száma",
            "Eszköz",
            "Márka",
            "Darabszám"
        );
    },
    optionList: (...args) => "<option value=" + args[0] + ">"+ args[1]+"</option>"
};