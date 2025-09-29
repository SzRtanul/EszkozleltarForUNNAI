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
    minden: (gal) => ""+gal+"",
    retheadlist: (...args) => tempex[1](args, ":"),
    retlist: (...args) => tempex[1](args),
    min: (retnMinden, fallsz=[], usqresplit=[], gluk) => {
        let fallasz = "";
        for(let i = 0; i < 5; i++){

        }
        return `<div class="retnrow">
    <select name="" id="">${fallasz}</select>
</div>`
    },
    theade: (...args) => tempex[0](args),
    theadevcslist: (...args) => tempex[0](args, 
        `<th><button>Étkezés hozzáadása</button></th>
        <th>
            <select name="alany" id="">
                <option value="">-- Alany Profilok --</option>
                <option value="">Becenév</option>
            </select>
        </th>`
    ),
    tbodybef: () => "<tbody>",
    tablerow: (...args) => {
        let ret = "<tr>";
        for(let i = 0; i < args.length; i++){
            ret+="<td>"+args[i]+"</td>";
        }
        ret+= "</tr>";
        return ret;
    },
    vcstablerow: (ohja, ...args) => 
        templates.tablerow(args) +
        "<tr><td>"+ ohja +"</td></tr>",
    withselect: (bef, bef2, ...arga) => {
        let ret = "<tr>";
        for(let i = 0; i < arga.length; i++){
            ret+="<td>"+arga[i]+"</td>";
        }
        ret+="<td><select name='frak'>"+bef+"</select></td>"+
            "<td><select name='frak'>"+bef2+"</select></td>";
        ret+= "</tr>";
        return ret;
    },
    seloption: (...args) => {
        let ret = "<option value='"+args[0]+"'>"
        for(let i = 0; i<args.length;i++){
            ret+=args[i];
        }
        ret +="</option>"
        // console.log("Rettenet: " + ret)
        return ret;
    },
    sela: (meka)=>`
<option class="retnrow" value="${meka}">
    <span>${meka}</span>
</option>`,
    tbodyend: () => "</tbody>",
    retndiv: (...args) => `
<div class="retnrow">
    <div>${args[0]}</div>
        <div class="film">
            <button
                class="scene sceneI scen scen0 mez" 
                nextTo="scen:1"
                dtag="1"
            >${args[1]}
            </button>
            <div 
                class="scene scen scen1 urlap"
                value="val"
                nextToIfSuccess="scen:0"
            >
                <input
                    name="id"
                    type="text"
                    class="inv" 
                >
                <input name="datum" type="text" value="${args[1]}">
                <button class="kuld">Küld</button>    
            </div>
        </div>
    </div>
</div>`,
    retndivhead: (...args) => `<p class="retnheader"><span>${args[0]}</span><span>${args[1]}</span></p>`,
    retrehen: (...args) => 
`<thead class="retnheader">
    <tr>
        <th>${args[0]}</th>
        <th>${args[1]}</th>
    </tr>
</thead><tbody>`,
    retrerown: (...args) => 
`<tr class="retnrow">
        <td>${args[0]}</td>
        <td>${args[1]}</td>
        <td class="urlap" usqF="0">
            <input type="number" name="jj" class="inv" value="${args[2]}">
            <input type="number" name="jj2" class="inv" value="${args[3]}">
            <button class="kuld">Kuka</button>
        </td>
    </tr>`,
    retrefoot: (retnart, retnart2, ...args) => 
`</tbody><tfoot class="retnfooter">
    <tr
        class="urlap"
        value="callquery"
        usqF="1"
    >
        <td>
            <select name="oszl">${retnart}</select>        
        </td>
        <td>
            <select name="oszl2" class="retnmain">${retnart2}</select>
        </td>
        <td><button class="kuld">Kűűűűűűggyed!</button></td>
    </tr>
</tfoot>`,
    retreopt: (...args)=> `<option class="retnrow" value="${args[0]}">${args[1]}</option>`,
    getDataLength: () => "F",
    profilev: (...args) => {
        localStorage.setItem("userid", args[0]);
        return tablerow(...args);
    },
    personev: (len="", data="" ) => {
console.log("LEN: " + len);
console.log("DATA: " + data);
        return len.length != 0 ? data : 
`<tbody class="">
    <tr><td>
        <button >További adatok megadása</button>
    </td></tr>
</tbody>`
;
    }
};