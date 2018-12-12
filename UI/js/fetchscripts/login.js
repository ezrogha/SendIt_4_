register = () => {
    event.preventDefault()
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    address = document.getElementById("address").value;
    password = document.getElementById("password").value;
    confirm = document.getElementById("confirm").value;

    if (username.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide a username"
        return false
    } else if (email.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide an email"
        return false
    } else if (phone.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide a phone number"
        return false
    } else if (address.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide aa address"
        return false
    } else if (password.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide a password"
        return false
    } else if (confirm.trim() === "") {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please confirm your password"
        return false
    }

    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {

    } else {
        err_element = document.getElementById("notif-register")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Please provide a valid email"
        return false
    }

    if (password != confirm) {
        notif_register = document.getElementById("notif-register")
        if (notif_register.classList.contains("succ-msg")) {
            notif_register.classList.add("err-msg")
            notif_register.innerHTML = "Passwords do not match, please check again"
            // console.log("Passwords dont match, please check again")
        } else {
            notif_register.classList.add("err-msg")
            notif_register.innerHTML = "Passwords do not match, please check again"
        }
    } else {
        const data = {
            username,
            email,
            phone,
            address,
            password
        };

        const url = "https://sendit-updated.herokuapp.com/api/v2/signup";
        // const url = "http://127.0.0.1:5000/api/v2/signup";

        register_loader = document.getElementsByClassName("loader")[0]
        register_btn = document.getElementsByClassName("btn")[0]
        err_element = document.getElementById("notif-register")
        if (err_element.classList.contains("err-msg")) {
            err_element.classList.remove("err-msg")
            err_element.style.display = "none"
        }
        register_loader.style.display = "block"
        register_btn.style.display = "none"

        fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                message = data["message"]
                if (message === "Account has been created") {
                    succ_element = document.getElementById("notif-register")
                    if (succ_element.classList.contains("err-msg")) {
                        succ_element.classList.remove("err-msg")
                    }
                    succ_element.classList.add("succ-msg")
                    succ_element.innerHTML = "You account has been successfully created"
                    register_loader.style.display = "none"
                    register_btn.style.display = "block"
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                } else {
                    err_element = document.getElementById("notif-register")
                    if (err_element.classList.contains("succ-msg")) {
                        err_element.classList.remove("succ-msg")
                    }
                    err_element.classList.add("err-msg")
                    err_element.innerHTML = message
                    register_loader.style.display = "none"
                    register_btn.style.display = "block"
                }
            })
            .catch(err => console.log(err))
    }
};


login = (user) => {
    event.preventDefault()
    email = document.getElementById("email_login").value;
    password = document.getElementById("password_login").value;

    if (email.trim() === "") {
        err_element = document.getElementById("notif-login")
        err_element.classList.add("err-msg")
        err_element.style.display = "block"
        err_element.innerHTML = "Please provide an email"
        return false
    } else if (password.trim() === "") {
        err_element = document.getElementById("notif-login")
        err_element.classList.add("err-msg")
        err_element.style.display = "block"
        err_element.innerHTML = "Please provide a password"
        return false
    }

    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {

    } else {
        err_element = document.getElementById("notif-login")
        err_element.classList.add("err-msg")
        err_element.innerHTML = "Something is not right with your email!, please double check"
        return false
    }

    const data = {
        email,
        password
    }

    if (user == 'admin') {
        var url = "https://sendit-updated.herokuapp.com/api/v2/admin/login"
        // var url = "http://127.0.0.1:5000/api/v2/admin/login"
        var home = "./orders.html"
    } else {
        var url = "https://sendit-updated.herokuapp.com/api/v2/login"
        // var url = "http://127.0.0.1:5000/api/v2/login"
        var home = "./order.html"
    }

    err_element = document.getElementById("notif-login")
    if (err_element.classList.contains("err-msg")) {
        err_element.classList.remove("err-msg")
        err_element.style.display = "none"
    }
    if (user === "admin") {
        login_loader = document.getElementsByClassName("loader")[0]
        login_btn = document.getElementsByClassName("btn")[0]
    } else {
        login_loader = document.getElementsByClassName("loader")[1]
        login_btn = document.getElementsByClassName("btn")[1]
    }
    login_loader.style.display = "block"
    login_btn.style.display = "none"

    fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty("access_token")) {
                token = data["access_token"]
                // console.log(token)
                localStorage.setItem("token", token)
                window.location.replace(home)
            } else {
                message = data["message"]
                err_element = document.getElementById("notif-login")
                err_element.classList.add("err-msg")
                err_element.style.display = "block"
                err_element.innerHTML = message
            }
            login_loader.style.display = "none"
            login_btn.style.display = "block"
        })
        .catch(err => console.log(err))

}