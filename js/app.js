//----------Funcion de carga nombre del usuario en AVATAR/ adapta ruta de boton a page account.html----------//
export function actualizarAvatarCuenta() {
    const span = document.querySelector(".header__avatar a span");
    const link = document.querySelector(".header__avatar a");
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo")) || {};

    if (span && link && usuario.nickname) {
        span.innerText = usuario.nickname;
        link.href = window.location.pathname.includes("/pages/")
            ? "./account.html"
            : "./pages/account.html";
    }
}