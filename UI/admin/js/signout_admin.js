$(document).ready(function() {
    $('.signout').click(function() {
        event.preventDefault()
        localStorage.removeItem("token")
        window.location.href = "./login.html";
    })
})