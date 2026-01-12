export const defUrlap = (id="", usqf="", value="", fields="", kuldFelirat="Frissít", inS=false) => 
`<form runssubmit="\x01" usqf="${usqf}" value='${(inS ? "insert" : "update") + "/" + value  + (!inS ? "/" + id : "")}' nextTo="" class="scene scen scen1">
    <div>
        ${!inS ? '<label>Id</label><input type="number" value="' + id + '" disabled class="">' : ''}
        ${fields}
    </div>
    <p>
        ${!inS ? `<button type="button" class="aktuel">
            <img src="" class="">
        </button>` : ''}
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
    dinput: (def="", name="", isWoap=false, type="text", placeholder="") =>
        "<input type='"+type+"' name='" + name + "' value='" + def + "' placeholder='"+ placeholder +"' class='mez"+(isWoap ? " woap" : "")+"' disabled>",
    input: (def="", name="", isWoap=false, type="text", placeholder="") =>
        "<input type='"+type+"' name='" + name + "' value='" + def + "' placeholder='"+ placeholder +"' class='mez"+(isWoap ? " woap" : "")+"'>",
    select: (def="", name="", cjust="", isWoap=true) => {
        return `
<select name="${name}" runschange="\x07" value="${def}" class="mez ${isWoap ? " woap" : ""}">
    <retn-p no cjust="${cjust}"></retn-p>
</select>`
    },
    label: (felirat="") => "<label for=''>" + felirat + "</label>",
    div: (content, akarmi="") => "<div " + akarmi + ">" + content + "</div>",
}

const mT = {
    nev: (arg, dname="nev") => mez.input(arg, dname),
    eszkozID: (arg, dname="eszkozID") => mez.select(arg, dname, "optionEszkozList"),
    markaID: (arg, dname="markaID") => mez.select(arg, dname, "optionMarkaList"),
    termekID: (arg, dname="termekID") => mez.select(arg, dname, "optionTermekList"),
    cegID: (arg, dname="cegID") => mez.select(arg, dname, "optionCegList"),
    helyisegTipusID: (arg, dname="helyisegTipusID") => mez.select(arg, dname, "optionHelyisegTipusList"),
    emeletID: (arg, dname="emeletID") => mez.select(arg, dname, "optionEmeletList"),
    helyisegID: (arg, dname="helyisegID") => mez.select(arg, dname, "optionHelyisegList"),
    beszerzesID: (arg, dname="beszerzesID") => mez.select(arg, dname, "optionBeszerzesList"),
    leltarEsemenyTipusID: (arg, dname="leltarEsemenyTipusID") => mez.select(arg, dname, "optionLeltarEsemenyTipusList"),
    osztalyID: (arg, dname="osztalyID") => mez.select(arg, dname, "optionOsztalyList"),
    tagozatID: (arg, dname="tagozatID") => mez.select(arg, dname, "optionTagozatList"),
  /*  ID: (arg, dname="ID") => mez.select(arg, dname, "optionList"),
    ID: (arg, dname="ID") => mez.select(arg, dname, "optionList"),
    ID: (arg, dname="ID") => mez.select(arg, dname, "optionList"),
    ID: (arg, dname="ID") => mez.select(arg, dname, "optionList")*/
}

export const mezok = {
    nevUpd: (args=[], megjelen="")=>{
        return mez.label(megjelen) + mT.nev(args[1]);
    },
    cegUpd: (args=[]) => {
        return mez.label("Cég neve") + mT.nev(args[1]);
    },
    termekUpd: (args=[])=>{
        return mez.label("Eszköznév") + mT.eszkozID(args[1]) +
            mez.label("Márka") + mT.markaID(args[2]) +
            mez.label("Tipus") + mT.nev(args[3], "tipus");
    },
    beszerzesUpd: (args=[]) => {
        return mez.label("Termék") + mT.termekID(args[1]) +
            mez.label("Gyártás éve") + mez.input(args[2], "gyartaseve", true) +
            mez.label("Használt cikk") + mez.input(args[5], "hasznalt", false, "checkbox") +
            mez.label("Cég") + mT.cegID(args[3]) +
            mez.label("Darabszám") + mez.input(args[4], "mennyiseg", true) +
            mez.label("Darabár") + mez.input(args[6], "darabar", true) +
            mez.label("Bérelt (Havi lebontás)") + mez.input(args[7], "haviberlet", false, "checkbox") +
            mez.label("Rendelés dátuma") + mez.input(args[8], "beszdat", false, "datetime-local") +
            mez.label("Átvétel dátuma") + mez.input(args[9], "atvetel", false, "datetime-local");
    },
    emeletUpd: (args=[]) => {
        return mez.label("Szint") + mez.input(args[1], "szint", true) +
            mez.label("Elnevezés") + mez.input(args[2], "elnevezes");
    },
    helyisegUpd: (args=[]) => {
        return mez.label("Helyiség azonosító") + mez.input(args[1], "chid") +
            mez.label("Helyiség típusa") + mT.helyisegTipusID(args[6]) +
            mez.label("Emelet") + mT.emeletID(args[8]) +
            mez.label("X kordináta(px)") + mez.input(args[2], "x", true) +
            mez.label("Y kordináta(px)") + mez.input(args[3], "y", true) +
            mez.label("Szélesség(px)") + mez.input(args[4], "width", true) +
            mez.label("Hosszúság(px)") + mez.input(args[5], "height", true) +
            mez.label("Helyiség neve(opcionális)") + mez.input(args[7], "nev");
    },
    leltarUpd: (args=[], isD=false) => {
        return mez.label("Beszerzés") + 
                (isD ? mez.dinput(args[0], "beszerzesID", true) : mT.beszerzesID(args[1])) /* Kompatibilitás */ +
            mez.label("Helyiség") + mT.helyisegID(args[1]) +
            mez.label("Darabszám") + mez.input(args[3], "mennyiseg", true)
    },
    leltarEsemenyUpd: (args=[], isD=false) => {
        return mez.label("Beszerzés") +
                (isD ? mez.dinput(args[0], "beszerzesID", true) : mT.beszerzesID(args[1])) +
            mez.label("Leltáresemény típus") + mT.leltarEsemenyTipusID(args[3]) +
            mez.label("Darabszám") + mez.input(args[2], "mennyiseg", true) +
            mez.label("Dátum") + mez.input(args[4], "mikor", true, "datetime-local");
    },
    falUpd: (args=[]) => {
        return mez.label("Helyiség") + mT.helyisegID(args[3]) +
            mez.label("X kordináta(px)") + mez.input(args[1], "x", true) +
            mez.label("Y kordináta(px)") + mez.input(args[2], "y", true) +
            mez.label("Sorrend pontszám") + mez.input(args[4], "sorrend", true);
    },
    tagozatUpd: (args=[]) => {
        return mez.label("Betű jelölés") + mez.input(args[1], "betujel") +
            mez.label("Elvégzéshez szükséges idő") + mez.input(args[2], "hossz", true) +
            mez.label("Tagozat neve") + mez.input(args[3], "tagozatmegnevezes");
    },
    osztalyUpd: (args=[]) => {
        return mez.label("Tagozat") + mT.tagozatID(args[2]) +
            mez.label("Kezdés éve") + mez.input(args[1], "kezdev", true);
    },
    teremKiosztasUpd: (args=[]) => {
        return mez.label("Osztály") + mT.osztalyID(args[1]) +
            mez.label("Helyiség") + mT.helyisegID(args[2]);
    },
}
