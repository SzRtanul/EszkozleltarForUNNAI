const defUrlap = (id="", value="", fields="", kuldFelirat="Hozzáad") => `
<form runssubmit="\x01" usqf="${value}" nextTo="" class="scene scen scen1">
    <div>
        <label>Id</label>
        <input type="number" name="row" value="${id}" disabled class="settr">
    </div>
    ${fields}
    <p>
        <button type="button" class="aktuel">
            <img src="" class="">
        </button>
        <button type="button" class="cancel" runsclick="\x06" nextTo="scen:0">Mégse</button>
        <input type="submit" value="${kuldFelirat}" class="but">
    </p>
    <span class="allapot"></span>
</form>
`

const mez = {
    input: (def="", name="", placeholder="", type="text") =>
        "<input type='"+type+"' name='" + name + "' value='" + def + "' placeholder='"+ placeholder +"' class='mez'>",
    select: (def="", name="", cjust="") => {
        return `
<select name="${name}" value="${def}" class="mez">
    <retn-p no cjust="${cjust}"></retn-p>
</select>`
    },
    label: (felirat="") => "<label for=''>" + felirat + "</label>"
}

const mezok = [
    (args) => {
        return mez.input(args[1], "nev", "Eszköz neve");
    },
];

export const urlapok = {
    eszkozUpd: (args="", usqf="")=>{
        return defUrlap(args[0], usqf, mezok[0](args));
    }
}
