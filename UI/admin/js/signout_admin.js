signout = document.getElementsByClassName("signout")
for (i = 0; i < signout.length; i++) {
    signout[i].onclick = () => {
        event.preventDefault()
        if (localStorage.getItem("token") != null) {
            localStorage.removeItem("token")
            window.location.replace("./login.html");
        }
    }
}