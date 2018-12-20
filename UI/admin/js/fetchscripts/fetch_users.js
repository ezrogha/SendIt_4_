window.onload = () => {
    const token = localStorage.getItem("token");
    data = JSON.parse(atob(token.split(".")[1]));
    userData = data["identity"];
    // console.log(`Data: ${JSON.stringify(userData)}`);

    // var url = "http://127.0.0.1:5000/api/v2/admin/users";
    const url = "https://sendit-updated.herokuapp.com/api/v2/admin/users";
    var method = "GET"
    const auth = `Bearer ${localStorage.getItem("token")}`;

    loader = document.getElementById("loader")
    loader.style.display = "block"

    fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: auth
            }
        })
        .then(response => response.json())
        .then(data => {
            $('#none').remove()
            $('.list-item').remove()
            if (data.length == 0) {
                order_list = document.getElementsByClassName("order-list")[0]
                noneDiv = document.createElement("div")
                noneDiv.setAttribute("id", "none")
                noneDiv.innerHTML = "No users currently available"
                order_list.appendChild(noneDiv)
            }
            data.forEach(user => {
                if (user["role"] !== "admin") {
                    handleUser(user);
                }
            });
            loader.style.display = "none"
        });

    var search_input = document.getElementById("search_users")
    search_input.onkeyup = (event) => {
        val = event.target.value
        if (val.trim() === "") {
            // var url = `http://127.0.0.1:5000/api/v2/admin/users`;
            var url = "https://sendit-updated.herokuapp.com/api/v2/admin/users";
            method = "GET"
        } else {
            new_val = val.trim()
            low_val = new_val.toLowerCase()
            // var url = `http://127.0.0.1:5000/api/v2/user/${low_val}`;
            var url = `https://sendit-updated.herokuapp.com/api/v2/user/${low_val}`;
            method = "PUT"
        }
        const auth = `Bearer ${localStorage.getItem("token")}`;

        fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth
                }
            })
            .then(response => response.json())
            .then(data => {
                $('#none').remove()
                $('.list-item').remove()
                if (data.length == 0) {
                    order_list = document.getElementsByClassName("order-list")[0]
                    noneDiv = document.createElement("div")
                    noneDiv.setAttribute("id", "none")
                    noneDiv.innerHTML = "No users currently available"
                    order_list.appendChild(noneDiv)
                }
                data.forEach(user => {
                    if (user["role"] !== "admin") {
                        handleUser(user);
                    }
                });
            });
    }
};

handleUser = user => {
    userId = user["userid"];
    username = user["username"];
    address = user["address"];
    email = user["email"];
    phone = user["phone"];
    sent = user["parcels"];
    status = user["status"];

    order_list = document.getElementsByClassName("order-list")[0];

    div_item = document.createElement("div");
    if (status === "active") {
        div_item.classList.add("list-item", "item-active");
    } else {
        div_item.classList.add("list-item", "item-not-active");
    }

    div_id = document.createElement("div");
    div_id.classList.add("list-col");
    div_id.innerHTML = userId;
    div_item.appendChild(div_id);
    order_list.appendChild(div_item);

    div_name = document.createElement("div");
    div_name.classList.add("list-col");
    div_name.innerHTML = username;
    div_item.appendChild(div_name);
    order_list.appendChild(div_item);

    div_address = document.createElement("div");
    div_address.classList.add("list-col");
    div_address.innerHTML = address;
    div_item.appendChild(div_address);
    order_list.appendChild(div_item);

    div_sent = document.createElement("div");
    div_sent.classList.add("list-col");
    div_sent.innerHTML = email;
    div_item.appendChild(div_sent);
    order_list.appendChild(div_item);

    div_received = document.createElement("div");
    div_received.classList.add("list-col");
    div_received.innerHTML = sent;
    div_item.appendChild(div_received);
    order_list.appendChild(div_item);

    div_status = document.createElement("div");
    div_status.classList.add("list-col");
    if (status === "active") {
        div_status.classList.add("yeah");
        div_status.innerHTML = "Active";
    } else {
        div_status.classList.add("not");
        div_status.innerHTML = "Not Active";
    }
    div_item.appendChild(div_status);
    order_list.appendChild(div_item);

    div_icon = document.createElement("div");
    div_icon.classList.add("list-col-icon");
    a_icon = document.createElement("a");
    a_icon.setAttribute("href", "#");
    a_icon.classList.add("icon-style", "trash");
    icon_user = document.createElement("icon");
    if (status === "active") {
        icon_user.setAttribute("title", "Deactivate");
        icon_user.classList.add("fa", "fa-user-times");
    } else {
        icon_user.setAttribute("title", "Activate");
        icon_user.classList.add("fas", "fa-user-check");
    }
    a_icon2 = document.createElement("a");
    a_icon2.setAttribute("href", "#");
    a_icon2.classList.add("icon-style", "trash");
    icon_user2 = document.createElement("icon");
    icon_user2.setAttribute("title", "View Parcels");
    icon_user2.classList.add("fa", "fa-eye");

    a_icon.appendChild(icon_user);
    a_icon2.appendChild(icon_user2);
    div_icon.appendChild(a_icon);
    div_icon.appendChild(a_icon2);
    div_item.appendChild(div_icon);
    order_list.appendChild(div_item);



    a_icon.onclick = () => {
        event.preventDefault()
        handleDlg(user)
        $(".dlg-wrapper").fadeIn()
        $(".dlg-box").fadeIn()
    }

    a_icon2.onclick = () => {
        event.preventDefault()
        userParcels(user)
    }

};

handleDlg = user => {
    username = user["username"]
    userId = user["userid"]
    status = user["status"]

    dlg_box = document.getElementsByClassName("dlg-box")[0]
    dlg_header = dlg_box.getElementsByClassName("dlg-header")[0]
    dlg_body = dlg_box.getElementsByClassName("dlg-body")[0]
    if (status === "active") {
        dlg_header.innerHTML = "Confirm Deactivation"
        dlg_body.innerHTML = `Are you sure you want to <i style='color: red'>deactivate</i> <span>${userId}</span>:${username}'s account?`
    } else {
        dlg_header.innerHTML = "Confirm Activation"
        dlg_body.innerHTML = `Are you sure you want to <i style='color: green'>activate</i> <span>${userId}</span>:${username}'s account?`
    }
}

userParcels = (user) => {
    // userId = user["userid"]
    localStorage.setItem("selectedUser", JSON.stringify(user))
    window.location.href = "./userparcels.html"
}