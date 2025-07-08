function validarEmail(input, msg, minimo, maximo) {
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



function validarPassword(input, msg, minimo, maximo) {
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



function cambiarForm() {
    const elementosToggables = document.querySelectorAll('.active, .inactive');
    elementosToggables.forEach(el => {
        if (el.classList.contains('active')) {
            el.classList.remove("active");
            el.classList.add("inactive");
        } else if (el.classList.contains('inactive')) {
            el.classList.remove("inactive");
            el.classList.add("active");
        }
    });
    return true;
}

function registrarUsuario(nombre, apellido, email, nickname, contraseña, fechaNac, departamento, direccion) {
    const nuevoUsuario = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    email: email.value.trim().toLowerCase(),
    nickname: nickname.value.trim(),
    contraseña: contraseña.value.trim(),
    fechaNac: fechaNac.value,
    departamento: departamento.value.trim(),
    direccion: direccion.value,
    rareza: "",
    avatar: "",
    nivel: 1,
    logros: [],
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(nuevoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(`Usuario registrado con exito.`)
}



document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo')) || []
    const spanUsuarioActivo = document.querySelector(".header__avatar a span");
    if(usuarioActivo && usuarioActivo.nickname){
        spanUsuarioActivo.innerText = usuarioActivo.nickname
    }

    const h2TituloSignUp = document.querySelector("h2.auth__container__title--sign-up");
    const h3TituloRegister = document.querySelector("h3.auth__container__title--register");
    const buttonRegistrate = document.querySelector(".auth__button--register");
    const formRegister = document.querySelector(".auth__form--sign-up");
    const inputNombre = document.querySelector(".auth__form__input--nombre-sign-up");
    const inputApellido = document.querySelector(".auth__form__input--apellido-sign-up");
    const inputEmail = document.querySelector(".auth__form__input--email-sign-up");
    const inputUser = document.querySelector(".auth__form__input--user-sign-up");
    const inputPass = document.querySelector(".auth__form__input--password-sign-up");
    const inputFechaNac = document.querySelector(".auth__form__input--fechaNac-sign-up");
    const inputDireccion = document.querySelector(".auth__form__input--direccion-sign-up");
    const selectDepartamento = document.querySelector(".auth__form__input__select--departamento-sign-up");
    const inputTYC = document.querySelector(".auth__tyc__box");
    const buttonSignUp = document.querySelector(".auth__form__button--submit-sign-up");
    const buttonSignUpClear = document.querySelector(".auth__form__button--clear-sign-up");

    const h2TituloLogin = document.querySelector("h2.auth__container__title--login");
    const h3TituloLogin = document.querySelector("h3.auth__container__title--login");
    const buttonIniciaSesion = document.querySelector(".auth__button--login");
    const formLogin = document.querySelector(".auth__form--login");
    const inputEmailLogin = document.querySelector(".auth__form__input--user-login");
    const inputPassLogin = document.querySelector(".auth__form__input--password-login");
    const buttonLogin = document.querySelector(".auth__form__button--submit-login");
    const buttonClear = document.querySelector(".auth__form__button--clear-login");
    
    if ((h2TituloSignUp && h3TituloRegister && buttonRegistrate && formRegister && inputNombre && inputApellido && inputEmail && inputUser && inputPass && inputFechaNac && inputDireccion && selectDepartamento && inputTYC && buttonSignUp &&buttonSignUpClear) && (h2TituloLogin && h3TituloLogin && buttonIniciaSesion && formLogin && inputEmailLogin && inputPassLogin && buttonLogin && buttonClear)){
        buttonRegistrate.addEventListener("click", () => {
            (cambiarForm())
        })
        buttonIniciaSesion.addEventListener("click", () => {
            (cambiarForm())
        })
    }



    const spanEmailLogin = document.querySelector(".msgUserLogin");
    const spanPassLogin = document.querySelector(".msgPasswordLogin");

    if (inputEmailLogin && inputPassLogin && buttonLogin && buttonClear) {
        buttonLogin.addEventListener("click", (e) => {
            e.preventDefault()
            if((validarEmail(inputEmailLogin, spanEmailLogin, 7, 50)) && (validarPassword(inputPassLogin, spanPassLogin, 8, 16))){
                inputEmailLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                inputPassLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                spanEmailLogin.innerText = "";
                spanEmailLogin.style.visibility = "hidden";
                spanPassLogin.innerText = "";
                spanPassLogin.style.visibility = "hidden";


                //Login pendiente de convertir en funcion 
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
                const usuarioEncontrado = usuarios.find(u =>
                    u.email === inputEmailLogin.value.trim().toLowerCase() && u.contraseña === inputPassLogin.value.trim()
                );
                if(usuarioEncontrado) {
                    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado))
                    alert(`Bienvenido ${usuarioEncontrado.nickname}.`)
                    window.location.href = "../index.html";
                }
            }
        })
    }

    const spanEmailSingUp = document.querySelector(".msgEmailSigmUp");
    const spanPassSingUp = document.querySelector(".msgPassSigmUp"); 

    if (inputEmail && inputPass && buttonSignUp && buttonSignUpClear) {
        buttonSignUp.addEventListener("click", (e) => {
            e.preventDefault()
            if((validarEmail(inputEmail,spanEmailSingUp, 7, 50)) && (validarPassword(inputPass, spanPassSingUp, 8, 16))){
                // inputEmailLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                // inputPassLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                // spanEmailLogin.innerText = "";
                // spanEmailLogin.style.visibility = "hidden";
                // spanPassLogin.innerText = "";
                // spanPassLogin.style.visibility = "hidden";
                registrarUsuario(inputNombre, inputApellido, inputEmail, inputUser, inputPass, inputFechaNac, inputDireccion, selectDepartamento)
            }
        })
    }    


});


