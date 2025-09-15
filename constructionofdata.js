const eszkoz=[
    {
        id: 0,
        nev: ""
    },
];

const eszkozinlelt=[ // Leltárban lévő eszközök
    {
        id: 0,
        eszkozID: 0,
        darabszam: 0
    }
];

const teremtipus=[
    {
        id: 0,
        nev: ""
    },
];

const terem=[
    {
        id: 0,
        nev: "",
        teremtipusID: 0
    },
];

const leltar = [
    {
        eszkozinleltID: 0,
        teremID: 0
    },
];

export const dataJSONs = {
    eszkoz: eszkoz,
    eszkozinlelt: eszkozinlelt,
    teremtipus: teremtipus,
    terem: terem,
    leltar: leltar
};