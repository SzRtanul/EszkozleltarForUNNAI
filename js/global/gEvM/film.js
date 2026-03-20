const filmek = {};
const dFilmek = {};

function doFilm(e){
    const hovas = e.target.getAttribute("nextTo")?.split(';');
    const film = e.target.closest(".film");
    if(film  && hovas){
        for(let i = 0; i < hovas.length; i++){
            const hova = hovas[i].split(':');
            const hol = hova[1];
            const tipus = hova[0];
            if(hova?.length > 1){
                for(const jel of film.querySelectorAll("."+tipus + ".sceneI")){
                    jel.classList.remove("sceneI");
                }
                for(const jel of film.getElementsByClassName(tipus+hol)){
                    jel.classList.add("sceneI");
                }
            }
        }
    }
}

function setToFilm(e){
    for(const film of Object.keys(filmek)){
        filmek[film].classList.add("scene");
        dFilmek[film] = filmek[film];
        delete filmek[film];
    }
    const cim = e.target.getAttribute("cim");
    dFilmek[cim].classList.remove("scene")
    filmek[cim] = dFilmek[cim];
    delete dFilmek[cim];
}

function addDFilm(film){
    film.classList.add("scene");
    dFilmek[film.getAttribute("cim")] = film;
}

function addFilm(film){
    filmek[film.getAttribute("cim")] = film;
}

class Film extends HTMLElement{
    connectedCallback() {
        addFilm(this);
    } 
}

class FilmD extends HTMLElement{
    connectedCallback() {
        addDFilm(this);
    } 
}

if (!customElements.get('film-d')) {
    customElements.define('film-d', FilmD);
}

if (!customElements.get('film-en')) {
    customElements.define('film-en', Film);
}

export { doFilm, setToFilm, addDFilm, addFilm };