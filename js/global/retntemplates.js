export const formDRef = [
    "0-0-3-0",
    "0-0-0-0",
    "0-0-0-1",
    "0-0-0-2",
    "0-0-2-3",
    // 5.
    "0-0-2-4",
    "0-0-0-5",
    "0-0-2-7",
    "0-0-0-6",
    "0-0-0-8",
    // 10.
    "0-0-0-9",
    "0-0-0-10",

];

export const retnDRef = [
    
];

export const retnCombinationTemplates = {
    
};

const retEx = [
    (data, theade="theade", trow="trow", tend="tbodyend") => theade + ":"+ trow +":"+ tend +"|||010002FF;" + data,
    (data)=>"",
    (sendQ, data, h1="") => retEx[0](data, ""),
    (data) => "optionList|||00FFFFFF;"+data,
]

export const retnCombinations = {
    felh: retEx[0]("F"),
    eszkozlist: retEx[0]("000", undefined, "trowEszkozList"),
    markalist: retEx[0]("001", undefined, "trowMarkaList"),
    helyisegtipuslist: retEx[0]("002", undefined, "trowHelyisegTipusList"),
    leltaresemenytipuslist: retEx[0]("003", undefined, "trowLeltarEsemenyTipusList"),
    ceglist: retEx[0]("004", undefined),
    termeklist: retEx[0]("005", undefined, "trowTermekList"),
    beszerzeslist: retEx[0]("006", undefined),
    emeletlist: retEx[0]("007", undefined),
    helyiseglist: retEx[0]("008", undefined),
    leltarlist: retEx[0]("009", undefined),
    leltaresemenylist: retEx[0]("00A", undefined),
    fallist: retEx[0]("00B", undefined),
    tagozatlist: retEx[0]("00C", undefined),
    osztalylist: retEx[0]("00D", undefined),
    teremkiosztaslist: retEx[0]("00E", undefined),
    tervrajz: "helyiseg:emelet|||00FFFFFF;00F---01FFFFFF;007;0=1=1",
    optionEszkozList: retEx[3]("000"),
    optionMarkaList: retEx[3]("003"),
    optionTermekList: retEx[3]("005"),
    optionCegList: retEx[3]("006"),
    optionHelyisegTipusList: retEx[3]("007"),
    optionEmeletList: retEx[3]("008"),
    optionHelyisegList: retEx[3]("009"),
    optionBeszerzesList: retEx[3]("00A"),
    optionLeltarEsemenyTipusList: retEx[3]("00B"),
    optionTagozatList: retEx[3]("00C"),
    optionOsztalyList: retEx[3]("00D"),
    optionTeremList: retEx[3]("00E"),
    optionLeltarList: retEx[3]("00F"),
    userperson: 
        "getDataLength:retlist:retheadlist:personev:theade:tablerow:tbodyend:|||" +
        "00FFFFFF;30A---0102FFFF;30A---03FFFFFF;30A;0:1",
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
