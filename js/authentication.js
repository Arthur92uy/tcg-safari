
export function iniciarSesion(email, msgmail, pass, msgpass){
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