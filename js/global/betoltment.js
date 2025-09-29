import { gl } from "./globaldata.js";
import { dataJSONs } from "./constructionofdata.js";

export function betolt(){
    for(const datagroup in dataJSONs){
        let xhr = new XMLHttpRequest();
        xhr.open('get', gl+'data/' + datagroup + ".txt", true);
        xhr.onload = function () {
//console.log("Botle")
//console.log(dataJSONs.eszkozinlelt);
            if(xhr.status === 200) {
                dataJSONs[datagroup] = xhr.response;
            } else {
              //  console.error("Hiba a fájl lekérésekor:", fname, xhr.status);
            }
//console.log(dataJSONs.eszkozinlelt);
        };

        xhr.onerror = function () {
           // console.error("Hálózati hiba a fájlnál:", fname);
        };
        xhr.send();
    }
}

export function ment(){
    for(const datagroup in dataJSONs){
        const data = new FormData();
        data.append("data", JSON.stringify(dataJSONs[datagroup]));
        data.append("fname", datagroup);
        let xhr = new XMLHttpRequest();
        xhr.open('post', gl+'/php/write.php', true);
        xhr.send(data);
    }
}