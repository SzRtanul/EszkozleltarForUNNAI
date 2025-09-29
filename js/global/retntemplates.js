export const formDRef = [
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    // 5.
    "",
];

export const retnDRef = [
    
];

export const retnCombinationTemplates = {
    
};

const retEx = [
    (data, theade="theade") => theade + ":tablerow:tbodyend|||010002FF;" + data,
    (data)=>"theadevcslist:tablerow:tbodyend|||FFFFFFFF;F---FFFFFFFF;F---010002FF;" + data,
    (sendQ, data, h1="") => retEx[0](data, "")
]

export const retnCombinations = {
    felh: retEx[0]("306"),
    userperson: 
        "getDataLength:retlist:retheadlist:personev:theade:tablerow:tbodyend:|||" +
        "00FFFFFF;30A---0102FFFF;30A---03FFFFFF;30A;0:1",
    profilev: "theade:profilev:tbodyend|||010002FF;309",
    personev: retEx[0]("30A")
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




