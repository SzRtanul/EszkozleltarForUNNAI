export const formDRef = [
    "3-0",
    "0-0",
    "0-1",
    "0-2",
    "2-3",
    // 5.
    "2-4",
    "0-5",
    "2-7",
    "0-6",
    "0-8",
    // 10.
    "0-9",
    "0-10",
    "3-12",
    "3-13",
    "3-14",
    // 15.
    "3-15",
    "0-16",
    "0-17",
];

export const modDRef = [ // LinkNum, MOD
    "0-0",
    "3-1",
];

export const retnDRef = [
    
];

export const retnCombinationTemplates = {
    
};

const retEx = [
    (data, theade="theade", trow="trow", tend="tbodyend", kozbeszur1="", kozbeszur2="") => 
        theade + ":"+ trow +":"+ tend + kozbeszur1 + "|||" + kozbeszur2 + "010002FF;" + data,
    (data, theade="theade", trow="trow", tend="tbodyend") => {
        return theade + ":"+ trow +":"+ tend +"|||010002FF;" + data;
    },
    (sendQ, data, h1="") => retEx[0](data, ""),
    (data, optionList="optionList", optionHead="optionHead", kozbeszur1="", kozbeszur2="") => {
        return optionList +":"+ optionHead + ":megn" + kozbeszur1 + "|||" + kozbeszur2 + "0001FFFF;" + data;
    }
]

export const retnCombinations = {
    felh: retEx[0]("F"),
    eszkozlist: retEx[0]("000", "theadeEszkozList", "trowEszkozList"),
    markalist: retEx[0]("001", "theadeMarkaList", "trowMarkaList"),
    helyisegtipuslist: retEx[0]("002", "theadeHelyisegTipusList", "trowHelyisegTipusList"),
    leltaresemenytipuslist: retEx[0]("003", "theadeLeltarEsemenyTipusList", "trowLeltarEsemenyTipusList"),
    ceglist: retEx[0]("004", "theadeCegList", "trowCegList"),
    megnCeg: "megn|||00FFFFFF;004",
    megnTermekT: "megn:megnTermekT|||00FFFFFF;000---00FFFFFF;001---01FFFFFF;005;0=1=0:1=2=0",
    megnTermekD: "megn:megnTermekD|||00FFFFFF;000---00FFFFFF;001---01FFFFFF;005;0=1=0:1=2=0",
    megnCegT: "megnCegT|||00FFFFFF;004",
    megnHelyisegT: ":megnHelyiseg:megn|||02FFFFFF;002---02FFFFFF;007---01FFFFFF;008;0=6=0:1=8=0",
    megnLeltarT: "trowLeltarList|||?megnHelyisegT---00FFFFFF;009;0=1=0",
    termeklist: retEx[0]("005;0=0=0", "theadeTermekList", "trowTermekList", undefined, "", "?megnTermekT---"),
    beszerzeslist: retEx[0]("006", "theadeBeszerzesList", "trowBeszerzesList"),
    emeletlist: retEx[0]("007", "theadeEmeletList", "trowEmeletList"),
    helyiseglist: retEx[0]("008", "theadeHelyisegList", "trowHelyisegList"),
    helyiseg2list: retEx[0]("008;0=0=0", "theadeHelyiseg2List", "trowHelyiseg2List", undefined, "", "?megnHelyisegT---"),
    leltarlist: retEx[0]("009;0=1=0", "theadeLeltarList", "trowLeltarList", undefined, "", "?megnHelyisegT---"),
    leltaresemenylist: retEx[0]("00A", "theadeLeltarEsemenyList", "trowLeltarEsemenyList"),
    fallist: retEx[0]("00B", "theadeFalList", "trowFalList"),
    tagozatlist: retEx[0]("00C", "theadeTagozatList", "trowTagozatList"),
    osztalylist: retEx[0]("00D", "theadeOsztalyList", "trowOsztalyList"),
    teremkiosztaslist: retEx[0]("00E", "theadeTeremKiosztasList", "trowTeremKiosztasList"),
    eszkozszuksegletlist: retEx[0]("015", "theadeEszkozSzuksegletList", "trowEszkozSzuksegletList"),
    termekszuksegletlist: retEx[0]("016", "theadeTermekSzuksegletList", "trowTermekSzuksegletList"),
    tervrajz: "helyiseg:emelet|||00FFFFFF;00F---01FFFFFF;007;0=1=1",
    customBeszerzesList: 
        "trow:theade:tbodyend:megn:customBeszerzesList:" +
        "theadeLeltarList:trowleLeltarEsemenyList:theadleBeszerzesList|||" +
        "03FFFFFF;003---FFFFFFFF;0FF---?leltarlist---06FFFFFF;00A;0=0=2"+
        "---FF05FFFF;009---FF01FFFF;00A---FFFF02FF;0FF"+
        "---FFFF02FF;0FF---?megnTermekD---?megnCeg" + 
        "---040702FF;006;2=0=2:3=0=0:4:5:6:8=1=0:9=3=0",
    customLeltarList: 
        "trow:theade:tbodyend:megn:customLeltarList:" +
        "trowleBeszerzesList:theadleHelyisegList|||" +
        "05FFFFFF;012---FF01FFFF;012---FFFF02FF;0FF" +
        "" +
        "---040602FF;013;0=0=0:1:2",
    optionEszkozList: retEx[3]("000"),
    optionMarkaList: retEx[3]("001"),
    optionHelyisegTipusList: retEx[3]("002"),
    optionLeltarEsemenyTipusList: retEx[3]("003"),
    optionCegList: retEx[3]("004"),
    optionTermekList: retEx[3]("005", "optionTermekList", undefined, "", "02FFFFFF;001---02FFFFFF;000---") + ";0=2=0:1=1=0",
    optionBeszerzesList: retEx[3]("006", "optionBeszerzesList"),
    optionEmeletList: retEx[3]("007", "optionEmeletList"),
    optionHelyisegList: retEx[3]("008", "optionHelyisegList"),
    optionLeltarList: retEx[3]("009", "optionLeltarList"),
    optionLeltarEsemenyList: retEx[3]("00A", "optionLeltarEsemenyList"),
    optionTagozatList: retEx[3]("00C", "optionTagozatList"),
    optionOsztalyList: retEx[3]("00D", "optionOsztalyList"),
    optionTeremList: retEx[3]("00E", "optionTeremKiosztasList"),
    userperson: 
        "getDataLength:retlist:retheadlist:personev:theade:tablerow:tbodyend:|||" +
        "00FFFFFF;30A---0102FFFF;30A;0=1=2:_0---03FFFFFF;30A;0:1",
    profilev: "theade:profilev:tbodyend|||010002FF;309",
  //  personev: retEx[0]("30A")
}

export const retnCombinationResults = {

};

// QUERRRRRRRRRRRRRRRRRRY
const exmplJSONs= [{
        limit: 50,
        site: 0
    }
];

export const staticQueryWithJSONs = [
    0,
    exmplJSONs[0],
];
