export const defUrlap = (id="", usqf="", value="", fields="", kuldFelirat="Frissít") => 
`<form runssubmit="\x01" usqf="${usqf}" value="update/${value}" nextTo="" class="scene scen scen1">
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
</form>`;

export const insUrlap = (fields="", kuldFelirat="Hozzáad") => 
`<div>
    ${fields}
</div>
<p>
    <input type="submit" value="${kuldFelirat}" class="but">
</p>
<span class="allapot"></span>`;

const mez = {
    input: (def="", name="", isWoap=false, type="text", placeholder="") =>
        "<input type='"+type+"' name='" + name + "' value='" + def + "' placeholder='"+ placeholder +"' class='mez"+(isWoap ? " woap" : "")+"'>",
    select: (def="", name="", cjust="", isWoap=true) => {
        return `
<select name="${name}" value="${def}" class="mez ${isWoap ? " woap" : ""}">
    <retn-p no cjust="${cjust}"></retn-p>
</select>`
    },
    label: (felirat="") => "<label for=''>" + felirat + "</label>"
}

export const mezok = {
    nevUpd: (args, megjelen="")=>{
        return mez.label(megjelen) + mez.input(args[1], "nev");
    },
    cegUpd: (args) => {
        return mez.label("Cég neve") + mez.input(args[1], "nev");
    },
    termekUpd: (args)=>{
        return mez.label("Eszköznév") + mez.select(args[1], "eszkozID", "optionEszkozList") +
            mez.label("Márka") + mez.select(args[2], "markaID", "optionMarkaList") +
            mez.label("Tipus") + mez.input(args[3], "tipus");
    },
    beszerzesUpd: (args) => {
        return mez.label("Termék") + mez.select(args[1], "termekID", "optionTermekList") +
            mez.label("Gyártás éve") + mez.input(args[2], "gyartaseve", true) +
            mez.label("Használt cikk") + mez.input(args[5], "hasznalt", false, "checkbox") +
            mez.label("Cég") + mez.select(args[3], "cegID", "optionCegList") +
            mez.label("Darabszám") + mez.input(args[4], "mennyiseg", true) +
            mez.label("Darabár") + mez.input(args[6], "darabar", true) +
            mez.label("Bérelt (Havi lebontás)") + mez.input(args[7], "haviberlet", false, "checkbox") +
            mez.label("Rendelés dátuma") + mez.input(args[8], "beszdat", false, "datetime-local") +
            mez.label("Átvétel dátuma") + mez.input(args[9], "atvetel", false, "datetime-local");
    },
    emeletUpd: (args) => {
        return mez.label("Szint") + mez.input(args[1], "szint", true) +
            mez.label("Elnevezés") + mez.input(args[2], "elnevezes");
    },
    helyisegUpd: (args) => {
        return mez.label("Helyiség azonosító") + mez.input(args[1], "chid") +
            mez.label("Helyiség típusa") + mez.select(args[6], "helyisegtipusID", "optionHelyisegTipusList") +
            mez.label("Emelet") + mez.select(args[8], "emeletID", "optionEmeletList") +
            mez.label("X kordináta(px)") + mez.input(args[2], "x", true) +
            mez.label("Y kordináta(px)") + mez.input(args[3], "y", true) +
            mez.label("Szélesség(px)") + mez.input(args[4], "width", true) +
            mez.label("Hosszúság(px)") + mez.input(args[5], "height", true) +
            mez.label("Helyiség neve(opcionális)") + mez.input(args[7], "nev");
    },
    leltarUpd: (args) => {
        return mez.label("Beszerzés") + mez.select(args[2], "beszerzesID", "optionBeszerzesList", true) +
            mez.label("Helyiség") + mez.select(args[1], "helyisegID", "optionHelyisegTipusList", true) +
            mez.label("Darabszám") + mez.input(args[3], "mennyiseg", true) +
            mez.label("Hozzáadás dátuma") + mez.input(args[4], "hozzaadva", false, "datetime-local");
    },
    leltarEsemenyUpd: (args) => {
        return mez.label("Beszerzés") + mez.select(args[1], "beszerzesID", "optionBeszerzesList") +
            mez.label("Leltáresemény típus") + mez.select(args[3], "leltaresemenytipusID", "optionLeltarEsemenyTipusList") +
            mez.label("Darabszám") + mez.input(args[2], "mennyiseg", true) +
            mez.label("Dátum") + mez.input(args[4], "mikor", true);
    },
    falUpd: (args) => {
        return mez.label("Helyiség") + mez.select(args[3], "helyisegID", "optionHelyisegList", true) +
            mez.label("X kordináta(px)") + mez.input(args[1], "x", true) +
            mez.label("Y kordináta(px)") + mez.input(args[2], "y", true) +
            mez.label("Sorrend pontszám") + mez.input(args[4], "sorrend", true);
    },
    tagozatUpd: (args) => {
        return mez.label("Betű jelölés") + mez.input(args[1], "betujel") +
            mez.label("Elvégzéshez szükséges idő") + mez.input(args[2], "hossz", true) +
            mez.label("Tagozat neve") + mez.input(args[3], "tagozatmegnevezes");
    },
    osztalyUpd: (args) => {
        return mez.label("Tagozat") + mez.select(args[2], "tagozatID", "optionTagozatList") +
            mez.label("Kezdés éve") + mez.input(args[1], "kezdev", true);
    },
    teremKiosztasUpd: (args) => {
        return mez.label("Osztály") + mez.select(args[1], "osztalyID", "optionOsztalyList") +
            mez.label("Helyiség") + mez.select(args[2], "helyisegID", "optionHelyisegList");
    },
}
