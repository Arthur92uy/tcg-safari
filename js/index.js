
document.addEventListener("DOMContentLoaded", function() {

    const URL_JSON = 'https://raw.githubusercontent.com/Arthur92uy/tcg-safari/refs/heads/main/js/usuarios.json'

    const notyf = new Notyf({
        duration: 3000,
        ripple: true,
        dismissible: false,
        position: { x: 'center', y: 'bottom' },
        types: [{
                type: 'custom',
                background: '#3B82F6',
                icon: false,
                className: 'notyf__toast--custom'
            } 
        ]
    });

    const contenedorDeCards = document.querySelector(".main__container__cards")
    // --------------------------------------------------------------------------- //

    async function inicializarUsuarios(){
        const usuariosLocal = localStorage.getItem('usuarios');
        if(!usuariosLocal) {
            try {
                const res = await fetch(URL_JSON);
                const data = await res.json();
                localStorage.setItem('usuarios', JSON.stringify(data));
            } catch(error){
            console.error('Error al cargar usuarios', error);
            }
        }
    }
    // --------------------------------------------------------------------------- //

    function cargarUsuariosEnCards(contenedor){
        const usuariosLocal = JSON.parse(localStorage.getItem('usuarios'))
        const cantidadUsuarios = document.querySelector(".main__info div p span")
        cantidadUsuarios.innerText= `${usuariosLocal.filter(u => u.eliminado === false).length}`
        contenedor.innerHTML =''
        for (let i=0; i < usuariosLocal.length; i++){
            if(usuariosLocal[i].eliminado === false) {
                let usuario = usuariosLocal[i]
                let rolClass
                let statusClass
                if(usuario.rol === "Administrador") {
                    rolClass="administrador"
                } else if (usuario.rol === "Manager") {
                    rolClass="manager"
                } else {
                    rolClass="usuario"
                }
                if(usuario.estado === "Activo") {
                    statusClass="activo"
                } else {
                    statusClass="inactivo"
                }
                contenedor.innerHTML += 
                `<div class="main__card" data-id="${usuario.id}">
                    <div class="card__options">
                        <div class="card__initials">
                            <span>${usuario.nombre[0]}${usuario.apellido[0]}</span>
                        </div>
                        <div class="card__icons">
                            <button type="button" title="ver" id="ver-usuario">
                                <img src="./img/ojo.png" alt="">
                            </button>
                            <button type="button" title="editar" id="editar-usuario">
                                <img src="./img/lapiz-de-color.png" alt="">
                            </button>
                            <button type="button" title="eliminar" id="eliminar-usuario">
                                <img src="./img/tacho-de-reciclaje.png" alt="">
                            </button>
                        </div>
                    </div>
                    <h3 class="card__user-name">${usuario.nombre} ${usuario.apellido}</h3>
                    <p class="card__user-mail">${usuario.email}</p>
                    <div class="card__user-info">
                        <span class="card__user-rol ${rolClass}">${usuario.rol}</span>
                        <span class="card__user-status ${statusClass}">${usuario.estado}</span>
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
        const inicialesHeader = document.querySelector(".initials")
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo")) || {};

        if (nombre && usuario.nombre && usuario.apellido && usuario.rol) {
            nombre.innerText = usuario.nombre + " " + usuario.apellido;
            inicialesHeader.innerText = `${usuario.nombre[0]}` + `${usuario.apellido[0]}`
            rol.innerText = usuario.rol
            if(usuario.rol === "Administrador") {
                rol.classList.add("administrador")
            } else if (usuario.rol === "Manager") {
                rol.classList.add("manager")
            } else {
                rol.classList.add("usuario")
            }
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
    const emailLogin = document.querySelector(".email-login");
    const contraseñaLogin = document.querySelector(".contraseña-login");
    const loginHeader = document.querySelector(".header__login");
    const userInfoHeader = document.querySelector(".header__user-info");
    const userIconsHeader = document.querySelector(".header__user-icons");
    const infoMain = document.querySelector(".main__info");
    const inputsContainerMain = document.querySelector(".main__container-inputs");
    const main = document.querySelector(".main");
    const userContainerHeader = document.querySelector(".header__user")
    const mainModalUsuario = document.querySelector(".main__modal-usuario")
    const overlay = document.querySelector(".overlay")

    botonCancelarModal.addEventListener("click", () => {
        mainModalLogin.classList.add("hide");
        mainModalBienvenida.classList.remove("hide");
    })

    botonIniciarSesionHeader.addEventListener("click", () => {
        mainModalBienvenida.classList.add("hide");
        mainModalLogin.classList.remove("hide");
    })

    botonIniciarSesionBienvenida.addEventListener("click", () => {
        mainModalBienvenida.classList.add("hide");
        mainModalLogin.classList.remove("hide");
    })

    function validarConstraseñaMail (email, contraseña) {
        if(!validator.isEmail(email.value)) {
            return false;
        }
        if (!validator.isStrongPassword(contraseña.value,{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }))
        {
            return false;
        }
    return true
    }

    function iniciarSesion(email, pass){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuarioEncontrado = usuarios.find(u => u.email === email.value.trim().toLowerCase());
    if(!usuarioEncontrado) {
        notyf.open({type: "custom", message: `El email es incorrecto!`});
        return false;
    }
    if(usuarioEncontrado.clave === pass.value.trim()){
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
        return true;
    } else {
        notyf.open({type: "custom", message: `La constraseña es incorrecta!`});
        return false;
    }
    }

    IniciarSesionLogin.addEventListener("submit", function(event){
        event.preventDefault();
        if(validarConstraseñaMail(emailLogin, contraseñaLogin)) {
            if(iniciarSesion(emailLogin, contraseñaLogin)){
                mainModalLogin.classList.add("hide");
                loginHeader.classList.add("hide");
                actualizarAvatarCuenta();
                userContainerHeader.classList.remove("header__user--justify");
                userIconsHeader.classList.remove("hide");
                userInfoHeader.classList.remove("hide");
                cargarUsuariosEnCards(contenedorDeCards);
                main.classList.remove("main--justify-center");
                contenedorDeCards.classList.remove("hide");
                infoMain.classList.remove("hide")
                inputsContainerMain.classList.remove("hide")
            }
        } else {
            notyf.open({type: "custom", message: `Error al cargar usuarios!`});
        }
    })
    contenedorDeCards.addEventListener("click", function(e) {
        if(e.target.closest("#ver-usuario")){
            const card = e.target.closest(".main__card");
            const idUsuario = card.getAttribute("data-id")
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.id === parseInt(idUsuario));

            if (usuario) {
                cargarModalUsuario(usuario, mainModalUsuario)
                mainModalUsuario.classList.remove("hide")
                overlay.classList.remove("hide")
            }
        }
    })

function cargarModalUsuario (usuario, contenedor) {
    let rolClass
    let statusClass
    if(usuario.rol === "Administrador") {
        rolClass="administrador"
    } else if (usuario.rol === "Manager") {
        rolClass="manager"
    } else {
        rolClass="usuario"
    }
    if(usuario.estado === "Activo") {
        statusClass="activo"
    } else {
        statusClass="inactivo"
    }
    contenedor.innerHTML = `
        <div class="main__modal-usuario__portada">
            <div class="main__modal-usuario__portada__titulo">
                <h2>Detalle de Usuario</h2>
                <img src="./img/cerrar.png" alt="Icono de cerrar" class="main__modal-usuario__icons cancelar">
            </div>
            <div class="main__modal-usuario__portada__presentacion">
                <span class="initials initials--modal__usuario">${usuario.nombre[0]}${usuario.apellido[0]}</span>
                <h3 class="modal__usuario-nombre">${usuario.nombre} ${usuario.apellido}</h3>
                <p class="modal__usuario-mail__presentacion">${usuario.email}</p>
            </div>
            <div class="main__modal-usuario__detalles">
                <div class="main__modal-usuario__info-personal">
                    <h4>Informacion Personal</h4>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/correo-electronico.png" alt="Icono de mail"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Email</p>
                            <p>${usuario.email}</p>
                        </div>
                    </div>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/usuario.png" alt="Icono de avatar"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Nombre Completo</p>
                            <p>${usuario.nombre} ${usuario.apellido}</p>
                        </div>
                    </div>
                </div>
                <div class="main__modal-usuario__permisos-estado">
                    <h4>Permisos y Estado</h4>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/blindaje.png" alt="Icono de escudo"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Rol</p>
                            <span class="${rolClass}">${usuario.rol}</span>
                        </div>
                    </div>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/onda-de-sonido.png" alt="Icono de senal"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Estado</p>
                            <span class="${statusClass}">${usuario.estado}</span>
                        </div>
                    </div>
                </div>
                <div class="main__modal-usuario__actividad">
                    <h4>Informacion de Actividad</h4>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/calendario.png" alt="Icono de calendario"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Fecha de Creacion</p>
                            <p>${usuario.fechaCreacion}</p>
                        </div>
                    </div>
                    <div class="modal-usuario__container">
                        <div class="modal-usuario__container-img">
                            <img src="./img/reloj.png" alt="Icono de relopj"class="main__modal-usuario__icons">
                        </div>
                        <div class="modal-usuario__container-text">
                            <p>Fecha de ultimo acceso</p>
                            <p>${usuario.ultimoAcceso}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main__modal-button__container">
                <button type="reset" class="main__modal-button cancelar">
                    Cerrar
                </button>
            </div>
        </div>
    `
}
    mainModalUsuario.addEventListener("click", function(e) {
        if(e.target.closest(".main__modal-usuario__icons.cancelar")){

            mainModalUsuario.classList.add("hide")
            overlay.classList.add("hide")
        }
    })
    mainModalUsuario.addEventListener("click", function(e) {
        if(e.target.closest(".main__modal-button.cancelar")){

            mainModalUsuario.classList.add("hide")
            overlay.classList.add("hide")
        }
    })

    const cerrarSesion = document.querySelector(".header__user-img.cerrar-sesion")

    cerrarSesion.addEventListener("click", () => {
        sessionStorage.clear
        loginHeader.classList.remove("hide");
        userContainerHeader.classList.add("header__user--justify");
        userIconsHeader.classList.add("hide");
        userInfoHeader.classList.add("hide");
        main.classList.add("main--justify-center");
        contenedorDeCards.classList.add("hide");
        infoMain.classList.add("hide")
        inputsContainerMain.classList.add("hide")
        mainModalBienvenida.classList.remove("hide")
    })

    const inputNombreUsuario = document.querySelector("#nombre")
    const inputApellidoUsuario = document.querySelector("#apellido")
    const inputEmailUsuario = document.querySelector("#email")
    const selectEstadoeUsuario = document.querySelector("#estado")
    const selectRolUsuario = document.querySelector("#rol")
    const mainModalUsuarioEditar = document.querySelector(".main__modal-editar")


    contenedorDeCards.addEventListener("click", function(e) {
        if(e.target.closest("#editar-usuario")){
            const card = e.target.closest(".main__card");
            const idUsuario = card.getAttribute("data-id")
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.id === parseInt(idUsuario));

            if (usuario) {
                cargarModalUsuarioEditar(usuario)
                
            }
        }
    })

    function cargarModalUsuarioEditar(usuario) {

        inputNombreUsuario.value = usuario.nombre
        inputApellidoUsuario.value = usuario.apellido
        inputEmailUsuario.value = usuario.email
        selectEstadoeUsuario.value = usuario.estado
        selectRolUsuario.value = usuario.rol
        mainModalUsuarioEditar.setAttribute("data-id",usuario.id)
        mainModalUsuarioEditar.classList.remove("hide")
        overlay.classList.remove("hide")

    }

    mainModalUsuarioEditar.addEventListener("click", function(e) {
        if(e.target.closest(".main__modal-usuario__icons.cancelar")){
            mainModalUsuarioEditar.classList.add("hide")
            overlay.classList.add("hide")
            cargarUsuariosEnCards(contenedorDeCards)
        }
    })

    mainModalUsuarioEditar.addEventListener("click", function(e) {
        if(e.target.closest(".main__modal-button-editar.cerrar")){

            mainModalUsuarioEditar.classList.add("hide")
            overlay.classList.add("hide")
            cargarUsuariosEnCards(contenedorDeCards)
        }
    })

    mainModalUsuarioEditar.addEventListener("click", function(e) {
        e.preventDefault()
        if(e.target.closest(".main__modal-button-editar.guardar")){

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.id === parseInt(mainModalUsuarioEditar.getAttribute("data-id")));
            if(modificarDatosUsuario(usuario, inputNombreUsuario, inputApellidoUsuario, inputEmailUsuario, selectRolUsuario, selectEstadoeUsuario)) {
                notyf.open({type: "custom", message: `Datos actualizados con éxito!`});
            }
        }
    })

    function modificarDatosUsuario (usuario, nombreNuevo, apellidoNuevo, mailNuevo, rolNuevo, estadoNuevo) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuariosActualizados = usuarios.map( u => {
            if (u.id == usuario.id) {
                return {... u, nombre: nombreNuevo.value, apellido: apellidoNuevo.value, email: mailNuevo.value, rol: rolNuevo.value, estado: estadoNuevo.value}
            } else {return u}
        })
        localStorage.setItem("usuarios",JSON.stringify(usuariosActualizados))
        cargarUsuariosEnCards(contenedorDeCards)
        return true;
    
    }


    contenedorDeCards.addEventListener("click", function(e) {
        if(e.target.closest("#eliminar-usuario")){
            const card = e.target.closest(".main__card");
            const idUsuario = card.getAttribute("data-id")
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(u => u.id === parseInt(idUsuario));

            Swal.fire({
                title: '¿Eliminar usuario?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        usuario.eliminado = true
                        const usuariosActualizados = usuarios.map( u => {
                            if (u.id == usuario.id) {
                                return {... u, eliminado: usuario.eliminado}
                            }else {
                                return u
                            }
                        })
                    localStorage.setItem("usuarios",JSON.stringify(usuariosActualizados))
                    cargarUsuariosEnCards(contenedorDeCards)
                    notyf.open({type: "custom", message: `Usuario eliminado con exito!`});
                    return true;
                }
            });
        }
    })

    const botonNuevoUsuario = document.querySelector(".main__button")
    const mainModalUsuarioNuevo = document.querySelector(".main__modal-usuario-nuevo")
    const iconoCerrarUsuarioNuevo = document.querySelector(".main__modal-usuario__icons.cancelar")
    const buttonCerrarUsuarioNuevo = document.querySelector(".main__modal-button-nuevo.cerrar")
    const buttonGuardarUsuarioNuevo = document.querySelector(".main__modal-button-nuevo.guardar")

    const nombreNuevo = document.querySelector("#nombreNuevo");
    const apellidoNuevo = document.querySelector("#apellidoNuevo");
    const emailNuevo = document.querySelector("#emailNuevo");
    const passwordNuevo = document.querySelector("#passwordNuevo");
    const passwordNuevoCopia = document.querySelector("#passwordNuevoCopia")
    const rolNuevo = document.querySelector("#rolNuevo");
    const estadoNuevo = document.querySelector("#estadoNuevo");


    botonNuevoUsuario.addEventListener("click", () => {
        mainModalUsuarioNuevo.classList.remove("hide")
        overlay.classList.remove("hide")
    })
    iconoCerrarUsuarioNuevo.addEventListener("click", () => {
        mainModalUsuarioNuevo.classList.add("hide")
        overlay.classList.add("hide")
    })
    buttonCerrarUsuarioNuevo.addEventListener("click", () => {
        mainModalUsuarioNuevo.classList.add("hide")
        overlay.classList.add("hide")
    })

    buttonGuardarUsuarioNuevo.addEventListener("click", function(e) {
        e.preventDefault()
        cargarUsuarioNuevo()
    }) 

    function cargarUsuarioNuevo () {
        if(passwordNuevoCopia.value !== passwordNuevo.value) {
            notyf.open({type: "custom", message: `Las contraseñas no coinciden.`})
        } else {
            if(!(validarConstraseñaMail(emailNuevo, passwordNuevo))){
                notyf.open({type: "custom", message: `Formato incorrecto de email y/o contraseña!`});
            } else {
                const usuarios = JSON.parse(localStorage.getItem("usuarios") || [])
                const idNuevoUsuario = usuarios.length
                const nombre = nombreNuevo.value.trim()
                const apellido = apellidoNuevo.value.trim()
                const email = emailNuevo.value.toLowerCase().trim()
                const password = passwordNuevo.value.trim()
                const estado = estadoNuevo.value.trim()
                const rol = rolNuevo.value.trim()
                const ahora = dayjs().format('DD/MM/YYYY HH:mm:ss')

                const objetoUsuarioNuevo = {
                    id: idNuevoUsuario,
                    nombre: nombre,
                    apellido: apellido,
                    rol: rol,
                    estado: estado,
                    fechaCreacion: ahora,
                    ultimoAcceso: "00/00/0000 00:00:00",
                    email: email,
                    clave: password,
                    eliminado: false
                }
                if(usuarios.push(objetoUsuarioNuevo)){
                    localStorage.setItem("usuarios",JSON.stringify(usuarios))
                    cargarUsuariosEnCards(contenedorDeCards)
                    notyf.open({type: "custom", message: `Usuario creado con exito!`});

                } else {
                    notyf.open({type: "custom", message: `Error al guardar usuario nuevo!`});
                }
            }
        }
        

    }


    inicializarUsuarios();

    }
)