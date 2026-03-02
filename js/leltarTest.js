import { doParseCHTML } from "./global/events.js";

const testCodes = [
`
\x00\x01html
`,
`\x00\x01html
\x00\x01html`,
`
\x00\x00html
`,
"\x00\x00html>Valamiiii",
`
\x00\x01html>Valami van
\x00\x00body>Igen, Van valami
`,
`
\x00\xFF<!DOCTYPE html>
\x00\x01html
\x00\x01body
\x00\x01main>
Ennek meg kell jelennie.
\x00\x02h5>Ennek méginkább.
\x00\x00h5>Ennek is.
\x00\x00retn-ph>Talán
`,
`\xFF
\x00\x01p>Ene
\x00\x00a
\x00\x03abe ahe0
\x00\x02
\x00\xFFEnt
\x00\x01button Acheton Acheton>EntZ
`
];

for(let i = 0; i < testCodes.length; i++){
	console.log(i+". teszt:")
	console.log(testCodes[i]);
	const ered = doParseCHTML(testCodes[i]);
	console.log("Eredmeny: ")
	console.log(ered);
}
