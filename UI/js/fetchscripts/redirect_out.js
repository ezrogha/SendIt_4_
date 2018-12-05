if (localStorage.getItem("token") == null) {
    window.location.replace("./index.html");
}

const token = localStorage.getItem("token")
data = JSON.parse(atob(token.split('.')[1]))
userData = data["identity"]
role = userData["role"]
if (role == "admin") {
    window.location.replace("./index.html");
}