

export function validarEmail(input, msg, minimo, maximo) {
    const value = input.value.trim().toLowerCase() 
    if (value.length < minimo){
        input.style.border='1px solid red';
        msg.innerText = `El email debe tener un minimo de ${minimo} caracteres.`;
        msg.style.visibility = "visible";
        return false;
    }
    if (value.length > maximo){
        input.style.border='1px solid red';
        msg.innerText = `El email debe tener un máximo de ${maximo} caracteres.`;
        msg.style.visibility = "visible";
        return false;
    }
    if (!value.includes("@") || !value.includes(".")) {
        input.style.border='1px solid red';
        msg.innerText = `El email debe contener el simbolo @ y un punto al menos una vez.`;
        msg.style.visibility = "visible";
        return false;
    }
    input.style.border='1px solid green';
    msg.innerText = "";
    msg.style.visibility = "hidden";
    return true;
}

export function validarPassword(input, msg, minimo, maximo) {
    const value = input.value.trim()
        if (value.length < minimo){
            input.style.border='1px solid red';
            msg.innerText = `La contraseña debe tener un minimo de ${minimo} caracteres.`;
            msg.style.visibility = "visible";
        return false;
        }
        if (value.length > maximo){
            input.style.border='1px solid red';
            msg.innerText = `La contraseña debe tener un máximo de ${maximo} caracteres.`;
            msg.style.visibility = "visible";
        return false;
        }
    input.style.border='1px solid green';
    msg.innerText = "";
    msg.style.visibility = "hidden";
    return true;
}