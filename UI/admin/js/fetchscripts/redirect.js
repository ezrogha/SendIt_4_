if (localStorage.getItem("token") != null) {
    const token = localStorage.getItem("token")
    data = JSON.parse(atob(token.split('.')[1]))
    userData = data["identity"]
    role = userData["role"]
    console.log(userData)
    if (role == "admin") {
        window.location.href = "./index.html";
    } else {
        window.location.href = "./login.html";
    }

}