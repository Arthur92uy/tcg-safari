//----------IMPORTS de funciones necesarias en LOGIN.HTML----------//
import { validarEmail, validarPassword } from "./validations.js";
import { iniciarSesion } from "./authentication.js";
import { actualizarAvatarCuenta } from "./app.js";


//----------Funcion de Switch de Form Registro/Login----------//
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


//----------Funcion Registro----------//
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
        email.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
        nickname.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
        contraseña.style.border='0.5px solid rgba(0, 0, 0, 0.3)';
        iniciarSesion(email, spanEmail, contraseña, spanNickname);
        form.reset()
        return true
    }
}





document.addEventListener("DOMContentLoaded", function () {
    
    actualizarAvatarCuenta() //----------Se carga nombre del usuario en AVATAR y se adapta ruta de link a account.html

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
    

    const spanEmailLogin = document.querySelector(".msgUserLogin");
    const spanPassLogin = document.querySelector(".msgPasswordLogin");

    const spanEmailSingUp = document.querySelector(".msgEmailSignUp");
    const spanPassSingUp = document.querySelector(".msgPassSignUp");
    const spanUserSignUp = document.querySelector(".msgUserSignUp");




    if ((h2TituloSignUp && h3TituloRegister && buttonRegistrate && formRegister && inputNombre && inputApellido && inputEmail && inputUser && inputPass && inputFechaNac && inputDireccion && selectDepartamento && inputTYC && buttonSignUp &&buttonSignUpClear) && (h2TituloLogin && h3TituloLogin && buttonIniciaSesion && formLogin && inputEmailLogin && inputPassLogin && buttonLogin && buttonClear)){
        buttonRegistrate.addEventListener("click", cambiarForm)
        buttonIniciaSesion.addEventListener("click", cambiarForm)
    }




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
                        window.location.href = "../pages/account.html";
                    }
                }
            }
        })
    }




    if (inputEmail && inputPass && buttonSignUp && buttonSignUpClear) {
        buttonSignUp.addEventListener("click", (e) => {
            e.preventDefault()
            if((validarEmail(inputEmail,spanEmailSingUp, 7, 50)) && (validarPassword(inputPass, spanPassSingUp, 8, 16))){
                if(registrarUsuario(formRegister, inputNombre, inputApellido, inputEmail, spanEmailSingUp, inputUser, spanUserSignUp, inputPass, inputFechaNac, selectDepartamento, inputDireccion)){
                    
                }
            }
        })
    }






        

});


