window.onload = () => {
    const token = localStorage.getItem("token");
    data = JSON.parse(atob(token.split(".")[1]));
    userData = data["identity"];
    // console.log(`Data: ${JSON.stringify(userData)}`);

    // const url = "http://127.0.0.1:5000/api/v2/admin/users";
    const url = "https://sendit-updated.herokuapp.com/api/v2/admin/users";
    const auth = `Bearer ${localStorage.getItem("token")}`;

    loader = document.getElementById("loader")
    loader.style.display = "block"
    fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                if (user["role"] !== "admin") {
                    handleUser(user);
                }
            });
            loader.style.display = "none"
        });
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
    div_item.classList.add("list-item", "item-active");

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
    a_icon.appendChild(icon_user);
    div_icon.appendChild(a_icon);
    div_item.appendChild(div_icon);
    order_list.appendChild(div_item);
    
    // dlg_wrapper = document.getElementsByClassName("dlg-wrapper")[0]
    // dlg_box = document.getElementsByClassName("dlg-box")[0]

    a_icon.onclick = () => {
        event.preventDefault()
        $(".dlg-wrapper").fadeIn()
        $(".dlg-box").fadeIn()
    }
    
};