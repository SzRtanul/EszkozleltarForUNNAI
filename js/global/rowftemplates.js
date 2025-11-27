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

export const mezok = {
    nevUpd: (args, megjelen="")=>{
        return mez.label(megjelen) + mez.input(args[1], "nev");
    },
    termekUpd: (args)=>{
        return mez.label("Eszköznév") + mez.select(args[1], "eszkozID", "optionEszkozList") +
            mez.label("Márka") + mez.select(args[2], "markaID", "optionMarkaList") +
            mez.label("Tipus") + mez.input(args[3], "tipus");
    }
}
