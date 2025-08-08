

document.addEventListener("DOMContentLoaded", function() {

    const URL_JSON = 'https://raw.githubusercontent.com/Arthur92uy/tcg-safari/refs/heads/main/js/usuarios.json'

    const contenedorDeCards = document.querySelector(".main__container__cards")
    // --------------------------------------------------------------------------- //

    async function inicializarUsuarios(){
        const usuariosLocal = localStorage.getItem('usuarios');
        if(!usuariosLocal) {
            try {
                const res = await fetch(URL_JSON);
                const data = await res.json();
                localStorage.setItem('usuarios', JSON.stringify(data));
                console.log('Usuarios iniciales cargados en localstorage');
            } catch(error){
            console.error('Error al cargar usuarios', error);
            }
        } else {
            console.log('Usuarios ya existen en localsorage')
        }
    }
    // --------------------------------------------------------------------------- //

    function cargarUsuariosEnCards(contenedor){
        const usuariosLocal = JSON.parse(localStorage.getItem('usuarios'))

        for (let i=0; i < usuariosLocal.length; i++){
            if(usuariosLocal[i].eliminado === false) {
                let usuario = usuariosLocal[i]
                contenedor.innerHTML += `
                <div class="main__cards">
                    <div class="card__options">
                        <div class="card__initials">CL</div>
                        <div class="card__icons">
                            <button type="button" title="ver">
                                <img src="./img/ojo.png" alt="">
                            </button>
                            <button type="button" title="editar">
                                <img src="./img/lapiz-de-color.png" alt="">
                            </button>
                            <button type="button" title="eliminar">
                                <img src="./img/tacho-de-reciclaje.png" alt="">
                            </button>
                        </div>
                    </div>
                    <h3 class="card__user-name">${usuario.nombre} ${usuario.apellido}</h3>
                    <p class="card__user-mail">${usuario.email}</p>
                    <div class="card__user-info">
                        <span class="card__user-rol">${usuario.rol}</span>
                        <span class="card__user-status">${usuario.estado}</span>
                    </div>
                    <div class="card__user-dates">
                        <p class="card__user-create">Creado: ${usuario.fechaCreacion}</p>
                        <p class="card__user-last-access">Ultimo acceso: ${usuario.ultimoAcceso}</p>
                    </div>
                </div>`
            }
        }
    }
    // --------------------------------------------------------------------------- //

    function actualizarAvatarCuenta() {
        const nombre = document.querySelector(".header__user-info p");
        const rol = document.querySelector(".header__user-subtitle")
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo")) || {};

        if (nombre && usuario.nombre && usuario.apellido && usuario.rol) {
            nombre.innerText = usuario.nombre + " " + usuario.apellido;
            rol.innerText = usuario.rol
        } else {
            console.log("No se cargo un usuario activo")
        }
    }
    // --------------------------------------------------------------------------- //

    const botonCancelarModal = document.querySelector(".main__modal-login__buttons .main__modal-button.cancelar");
    const mainModalLogin = document.querySelector(".main__modal-login");
    const mainModalBienvenida = document.querySelector(".main__modal-bienvenida");
    const botonIniciarSesionHeader = document.querySelector(".header__button.login");
    const botonIniciarSesionBienvenida = document.querySelector(".main__modal-bienvenida .main__modal-button");
    const IniciarSesionLogin = document.querySelector(".main__modal-login form");
    const emailLogin = document.querySelector(".email-login")
    const contraseñaLogin = document.querySelector(".contraseña-login")

    botonCancelarModal.addEventListener("click", () => {
        mainModalLogin.classList.add("hide")
        mainModalBienvenida.classList.remove("hide")
    })

    botonIniciarSesionHeader.addEventListener("click", () => {
        mainModalBienvenida.classList.add("hide")
        mainModalLogin.classList.remove("hide")
    })

    botonIniciarSesionBienvenida.addEventListener("click", () => {
        mainModalBienvenida.classList.add("hide")
        mainModalLogin.classList.remove("hide")
    })

    IniciarSesionLogin.addEventListener("submit", function(event){
        event.preventDefault();
        if((validator.isEmail(emailLogin.value)) && (
            validator.isStrongPassword(contraseñaLogin.value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        )) {
            console.log("valores validos, chequear existencia")
        } else {
            console.log("error")
        }
    })

    inicializarUsuarios()
    actualizarAvatarCuenta()
    cargarUsuariosEnCards(contenedorDeCards)
})