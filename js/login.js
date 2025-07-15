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

function registrarUsuario(form, nombre, apellido, email, spanEmail, nickname, spanNickname, contraseña, fechaNac, departamento, direccion) {
    const nuevoUsuario = {
    nombre: nombre.value.trim(),
    apellido: apellido.value.trim(),
    email: email.value.trim().toLowerCase(),
    nickname: nickname.value.trim(),
    password: contraseña.value.trim(),
    fechaNac: fechaNac.value,
    departamento: departamento.value.trim(),
    direccion: direccion.value,
    rareza: "",
    avatar: "",
    nivel: 1,
    logros: [],
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existeEmail = usuarios.some(u => u.email === nuevoUsuario.email);
    const existeNickname = usuarios.some(u => u.nickname === nuevoUsuario.nickname);
    if (existeEmail || existeNickname) {
        if (existeEmail) {
        email.style.border='1px solid red';
        spanEmail.innerText = `Ya existe una cuenta asociada a ese Email.`;
        spanEmail.style.visibility = "visible";
        }
        if (existeNickname) {
            nickname.style.border='1px solid red';
            spanNickname.innerText = `Ya existe una cuenta asociada a ese Nickname.`;
            spanNickname.style.visibility = "visible";
            
        }
        return false
    } else {
        usuarios.push(nuevoUsuario)
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        form.reset()
        return true
    }
}


function iniciarSesion(email, msgmail, pass, msgpass){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuarioEncontrado = usuarios.find(u => u.email === email.value.trim().toLowerCase());
    if(!usuarioEncontrado) {
        email.style.border='1px solid red';
        msgmail.innerText = `No existe una cuenta asociada a ese Email.`;
        msgmail.style.visibility = "visible";
        return false;
    }
    if(usuarioEncontrado.password === pass.value.trim()){
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado))
        alert(`Bienvenido ${usuarioEncontrado.nickname}.`)
        email.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
        msgmail.innerText = "";
        msgmail.style.visibility = "hidden";
        pass.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
        msgpass.innerText = "";
        msgpass.style.visibility = "hidden";
        return true;
    } else {
        pass.style.border='1px solid red';
        msgpass.innerText = `La contraseña ingresada es incorrecta.`;
        msgpass.style.visibility = "visible";
        return false;
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo')) || []
    const spanUsuarioActivo = document.querySelector(".header__avatar a span");
    const linkUsuarioActivo = document.querySelector(".header__avatar a")
    
    if(usuarioActivo && usuarioActivo.nickname){
        spanUsuarioActivo.innerText = usuarioActivo.nickname
        //CAMBIAR AL SUBR A SERVIDOR
        linkUsuarioActivo.href = `${window.location.pathname.includes('/pages/') ? './account.html' : './pages/account.html'}`;
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
            if((validarEmail(inputEmailLogin, spanEmailLogin, 7, 50))){
                inputEmailLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                spanEmailLogin.innerText = "";
                spanEmailLogin.style.visibility = "hidden";
                if(validarPassword(inputPassLogin, spanPassLogin, 8, 16)){
                    inputPassLogin.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
                    spanPassLogin.innerText = "";
                    spanPassLogin.style.visibility = "hidden";
                    if(iniciarSesion(inputEmailLogin, spanEmailLogin, inputPassLogin, spanPassLogin)) {
                        window.location.href = "../index.html";
                    }
                }
            }
        })
    }

    const spanEmailSingUp = document.querySelector(".msgEmailSignUp");
    const spanPassSingUp = document.querySelector(".msgPassSignUp");
    const spanUserSignUp = document.querySelector(".msgUserSignUp")

    if (inputEmail && inputPass && buttonSignUp && buttonSignUpClear) {
        buttonSignUp.addEventListener("click", (e) => {
            e.preventDefault()
            if((validarEmail(inputEmail,spanEmailSingUp, 7, 50)) && (validarPassword(inputPass, spanPassSingUp, 8, 16))){
                registrarUsuario(formRegister, inputNombre, inputApellido, inputEmail, spanEmailSingUp, inputUser, spanUserSignUp, inputPass, inputFechaNac, inputDireccion, selectDepartamento)
            }
        })
    }    


});


