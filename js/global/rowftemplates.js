const urlapok = {
    mezek1: ""
}

const defUrlap = (value="", fields="", felirat="Hozzáad") => `
<form runssubmit="\x01" value="${value}">
    <div>
        <label>Id</label>
        <input type="number" name="id" value="" disabled class="mez">
    </div>
    ${fields}
    <p><input type="sumbit" value="${felirat}" class="but"></p>
    <span class="allapot"></span>
</form>
`

const mez = {
    input: (name="", type="text", placeholder="") => "<input type='"+type+"' name='" + name + "' placeholder='"+ placeholder +"' class='mez'>",
    select: (name="", cjust="") => {
        return `
<select name="${name}" class="mez">
    <retn-p no cjust="${cjust}"></retn-p>
</select>`
    },
    label: (felirat="") => "<label for=''>" + felirat + "</label>"
}

