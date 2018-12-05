signout = document.getElementById("signout")
signout.onclick = () => {
    event.preventDefault()
    if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token")
        window.location.replace("./index.html");
    }
}