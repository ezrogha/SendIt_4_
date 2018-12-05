register = () => {
    event.preventDefault()
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    address = document.getElementById("address").value;
    password = document.getElementById("password").value;
    confirm = document.getElementById("confirm").value;

    if (password != confirm) {
        document.getElementById("notif-register").innerHTML = "Passwords do not match, , please check again"
        console.log("Passwords dont match, please check again")
    } else {
        const data = {
            username,
            email,
            phone,
            address,
            password
        };

        const url = "https://sendit-updated.herokuapp.com/api/v2/signup";

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
                } else {
                    err_element = document.getElementById("notif-register")
                    if (err_element.classList.contains("succ-msg")) {
                        succ_element.classList.remove("succ-msg")
                    }
                    err_element.classList.add("err-msg")
                    err_element.innerHTML = message
                }
            })
            .catch(err => console.log(err))
    }
};


login = (user) => {
    event.preventDefault()
    username = document.getElementById("username_login").value;
    password = document.getElementById("password_login").value;

    const data = {
        username,
        password
    }

    if (user == 'admin') {
        var url = "https://sendit-updated.herokuapp.com/api/v2/admin/login"
        var home = "./orders.html"
    } else {
        var url = "https://sendit-updated.herokuapp.com/api/v2/login"
        var home = "./order.html"
    }

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
                console.log(token)
                localStorage.setItem("token", token)
                window.location.replace(home)
            } else {
                message = data["message"]
                err_element = document.getElementById("notif-login")
                err_element.classList.add("err-msg")
                err_element.innerHTML = message
            }
        })
        .catch(err => console.log(err))

}