import { actualizarAvatarCuenta } from "./app.js";


function cargarDatosTrainer (usuario, array){
    if (!array || !usuario || Object.keys(usuario).length === 0) {
        alert("Datos vacios o inexistentes.")
        return;
    }

    array.forEach(({clave, campo}) => {
        if(usuario[clave] && campo) {
            if(campo.tagName === "SELECT") {
                preseleccionarValor(campo, usuario[clave]);
            } else {
                campo.value = usuario[clave];
            }
            campo.disabled = true;
            campo.style.color = '#333';
            campo.style.opacity = '0.7';
        }
    })

}


function preseleccionarValor(select, valor) {
    Array.from(select.options).forEach(opt => {
        opt.selected = opt.value === valor;
    });
}



document.addEventListener("DOMContentLoaded", function () {
    
    actualizarAvatarCuenta() //----------Se carga nombre del usuario en AVATAR y se adapta ruta de link a account.html
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo")) || {};

    const bienvenidaEntrenador = document.querySelector(".hero__title--account span");
    if(usuarioActivo.nickname) bienvenidaEntrenador.innerText = usuarioActivo.nickname
    
    const inputNombre = document.querySelector(".form__input__trainer-nombre");
    const inputApellido = document.querySelector(".form__input__trainer-apellido");
    const inputEmail = document.querySelector(".form__input__trainer-email");
    const inputUser = document.querySelector(".form__input__trainer-user");
    const inputPass = document.querySelector(".form__input__trainer-password");
    const inputFechaNac = document.querySelector(".form__input__trainer-fechaNac");
    const selectDepartamento = document.querySelector(".form__input__trainer-departamento");
    const inputDireccion = document.querySelector(".form__input__trainer-direccion");

    const arrayInputs = [
        { clave: "nombre", campo: inputNombre },
        { clave: "apellido", campo: inputApellido },
        { clave: "email", campo: inputEmail },
        { clave: "nickname", campo: inputUser },
        { clave: "password", campo: inputPass },
        { clave: "fechaNac", campo: inputFechaNac },
        { clave: "direccion", campo: inputDireccion },
        { clave: "departamento", campo: selectDepartamento } // ← tu select
    ];

    cargarDatosTrainer(usuarioActivo, arrayInputs)

    const buttonModificar = document.querySelector(".trainer__button-modificar");
    const buttonGuardar = document.querySelector(".trainer__button-guardar");


    const spanEmailAccount = document.querySelector(".msgEmailAccount");
    const spanPassAccount = document.querySelector(".msgPassAccount");
    const spanNombreCompleto = document.querySelector(".msgNombreCompletoAccount");
    const spanUserAccount = document.querySelector(".msgUserAccount");
    const spanFNacDeptoAccount = document.querySelector(".msgFNacDeptoAccount");

buttonModificar.addEventListener("click", () => {
    for (const input of arrayInputs){
        input.campo.disabled = false;
        input.campo.style.color = '#333';
        input.campo.style.opacity = '1';
    }
})



});