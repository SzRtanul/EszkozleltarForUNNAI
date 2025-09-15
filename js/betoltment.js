import { dataJSONs } from "../constructionofdata.js";

function betolt(){

}

function ment(){
    var data = "";
    for(const datagroup of dataJSONs){
        data = JSON.stringify(datagroup);
        let xhr = new XMLHttpRequest();
        xhr.open('post', '/web/eszkozleltar/'+datagroup.key, true );
        xhr.send(data);
    }
}