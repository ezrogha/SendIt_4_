window.onload = () => {
    const token = localStorage.getItem("token")
    data = JSON.parse(atob(token.split('.')[1]))
    userData = data["identity"]

    // Profile 
    profile_name = document.getElementById("profile-name")
    profile_name.getElementsByTagName("span")[0].innerHTML = userData["username"]
    document.getElementById("dlg-name").innerHTML = userData["username"]
    document.getElementById("dlg-email").innerHTML = userData["email"]
    document.getElementById("dlg-address").innerHTML = userData["address"]
    document.getElementById("dlg-phone").innerHTML = userData["phone"]

    profile_orders = document.getElementById("profile-orders")
    profile_orders.getElementsByTagName("span")[0].innerHTML = userData["parcels"]

    //Dialog
    document.getElementById("username").value = userData["username"]
    document.getElementById("email").value = userData["email"]
    document.getElementById("address").value = userData["address"]
    document.getElementById("phone").value = userData["phone"]

    //Save
    dlg_box_prof = document.getElementsByClassName("dlg-box-prof")[0]
    dlg_footer_prof = dlg_box_prof.getElementsByClassName("dlg-footer")[0]
    dlg_footer_prof_save = dlg_footer_prof.getElementsByClassName("save")[0]
    dlg_footer_prof_save.onclick = () => {
        save_changes()
    }

    userId = userData["userid"]
    var url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/parcels`
    // var url = `http://127.0.0.1:5000/api/v2/users/${userId}/parcels`
    const auth = `Bearer ${localStorage.getItem("token")}`
    loader = document.getElementById("loader")
    loader.style.display = "block"
    fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
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
                noneDiv.innerHTML = "No orders currently available"
                order_list.appendChild(noneDiv)
            }
            delivered = 0
            not_delivered = 0
            in_transit = 0
            cancelled = 0
            data.forEach(parcel => {
                if (parcel["status"] === "Delivered") {
                    delivered += 1
                } else if (parcel["status"] === "Not Delivered") {
                    not_delivered += 1
                } else {
                    in_transit += 1
                }
                if (parcel["cancel_status"] !== "") {
                    cancelled += 1
                }
            })
            document.getElementById("dlg-deli").innerHTML = delivered
            document.getElementById("dlg-notdeli").innerHTML = not_delivered
            document.getElementById("dlg-intran").innerHTML = in_transit
            document.getElementById("dlg-canc").innerHTML = cancelled

            data.forEach(parcel => handleParcel(parcel))
            loader.style.display = "none"
        })
        .catch(err => `Error: ${err}`)

    var search_input = document.getElementById("search_orders")
    search_input.onkeyup = (event) => {
        val = event.target.value
        console.log(val)
        if (val.trim() === "" || isNaN(val.trim())) {
            var url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/parcels`
            // var url = `http://127.0.0.1:5000/api/v2/users/${userId}/parcels`
            method = "GET"
        } else {
            new_val = val.trim()
            var url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/parcel/${new_val}`
            // var url = `http://127.0.0.1:5000/api/v2/users/${userId}/parcel/${new_val}`
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
                    noneDiv.innerHTML = "No orders currently available"
                    order_list.appendChild(noneDiv)
                }
                data.forEach(parcel => {
                    if (parcel["role"] !== "admin") {
                        handleParcel(parcel);
                    }
                });
            });
    }

}


handleParcel = parcel => {
    creation_date = parcel["creation_date"]
    current_location = parcel["current_location"]
    destination = parcel["destination"]
    parcelid = parcel["parcelid"]
    price = parcel["price"]
    source = parcel["source"]
    status = parcel["status"]
    weight = parcel["weight"]
    cancel_status = parcel["cancel_status"]

    order_list = document.getElementsByClassName("order-list")[0]

    div_item = document.createElement("div")
    if (status === "Not Delivered") {
        div_item.classList.add("list-item", "item-not-delivered")
    } else if (status === "Delivered") {
        div_item.classList.add("list-item", "item-delivered")
    } else if (status === "In Transit") {
        div_item.classList.add("list-item", "item-in-transit")
    }

    div_id = document.createElement("div")
    div_id.classList.add("list-col")
    div_id.innerHTML = parcelid
    div_item.appendChild(div_id)

    div_src = document.createElement("div")
    div_src.classList.add("list-col")
    div_src.innerHTML = source
    div_item.appendChild(div_src)

    div_dest = document.createElement("div")
    div_dest.classList.add("list-col")
    div_dest.innerHTML = destination
    div_item.appendChild(div_dest)

    div_wei = document.createElement("div")
    div_wei.classList.add("list-col")
    div_wei.innerHTML = weight
    div_item.appendChild(div_wei)

    div_price = document.createElement("div")
    div_price.classList.add("list-col")
    div_price.innerHTML = price
    div_item.appendChild(div_price)

    div_sta = document.createElement("div")
    if (status === "Not Delivered") {
        if (cancel_status === "Cancelled") {
            div_sta.classList.add("list-col", "cancelled")
            div_sta.innerHTML = cancel_status
        } else {
            div_sta.classList.add("list-col", "not")
            div_sta.innerHTML = status
        }
    } else if (status === "Delivered") {
        div_sta.classList.add("list-col", "yeah")
        div_sta.innerHTML = status
    } else if (status === "In Transit") {
        div_sta.classList.add("list-col", "in-transit")
        div_sta.innerHTML = status
    }

    // div_sta.innerHTML = status
    div_item.appendChild(div_sta)

    order_list.appendChild(div_item)

    div_item.onclick = () => {
        handledialog(parcel)
    }

}


handledialog = parcel => {
    status = parcel["status"]
    parcelid = parcel["parcelid"]
    source = parcel["source"]
    destination = parcel["destination"]
    creation_date = parcel["creation_date"]
    weight = parcel["weight"]
    price = parcel["price"]
    current_location = parcel["current_location"]
    cancel_status = parcel["cancel_status"]

    if (status === "Not Delivered") {
        dlg_box_edit = document.getElementsByClassName("dlg-box-edit")[0]
        dlg_header = dlg_box_edit.getElementsByClassName("dlg-header")[0]
        dlg_header_ord = dlg_header.getElementsByTagName("span")[0]
        dlg_header_date = dlg_header.getElementsByTagName("span")[1]
        dlg_header_ord.innerHTML = parcelid
        dlg_header_date.innerHTML = creation_date
        from_edit = document.getElementById("from-edit")
        from_edit.getElementsByTagName("option")[0].innerHTML = source

        to_edit = document.getElementById("to-edit")

        for (i = 0; i < to_edit.length; i++) {
            to_edit.options[i].removeAttribute("selected")
        }

        for (i = 0; i < to_edit.length; i++) {
            if (to_edit.options[i].value === destination) {
                to_edit.options[i].setAttribute("selected", "selected")
            }
        }

        weight_edit = document.getElementById("weight-edit")
        price_edit = document.getElementById("price-edit")
        weight_edit.value = weight
        price_edit.value = price
        status_edit = document.getElementById("status-edit")
        status_edit.getElementsByTagName("option")[0].innerHTML = status
        location_edit = document.getElementById("location-edit")
        location_edit.value = current_location

        dlg_footer = dlg_box_edit.getElementsByClassName("dlg-footer")[0]
        dlg_footer_cancel_order = dlg_footer.getElementsByTagName("button")[1]
        dlg_footer_make_order = dlg_footer.getElementsByTagName("button")[2]


        if (cancel_status === "Cancelled") {
            dlg_footer_cancel_order.style.display = "none"
            dlg_footer_make_order.style.display = "inline-block"
        } else {
            dlg_footer_cancel_order.style.display = "inline-block"
            dlg_footer_make_order.style.display = "none"
        }

        $('.dlg-wrapper-edit').fadeIn();
        $('.dlg-box-edit').fadeIn();

    } else if (status === "Delivered") {
        dlg_box = document.getElementsByClassName("dlg-box")[0]
        dlg_header = dlg_box.getElementsByClassName("dlg-header")[0]
        dlg_header_ord = dlg_header.getElementsByTagName("span")[0]
        dlg_header_date = dlg_header.getElementsByTagName("span")[1]
        dlg_header_ord.innerHTML = parcelid
        dlg_header_date.innerHTML = creation_date

        myfrom = document.getElementById("from")
        myfrom.getElementsByTagName("option")[0].innerHTML = source
        myto = document.getElementById("to")
        myto.getElementsByTagName("option")[0].innerHTML = destination

        myweight = document.getElementById("weight")
        myprice = document.getElementById("price")
        myweight.value = weight
        myprice.value = price
        mystatus = document.getElementById("status")
        mystatus.getElementsByTagName("option")[0].innerHTML = status
        mylocation = document.getElementById("location")
        mylocation.value = current_location

        $('.dlg-wrapper').fadeIn();
        $('.dlg-box').fadeIn();

    } else if (status === "In Transit") {
        dlg_wrapper_edit = document.getElementsByClassName("dlg-wrapper-edit")[0]
        dlg_box_edit = document.getElementsByClassName("dlg-box-edit")[0]
        dlg_header = dlg_box_edit.getElementsByClassName("dlg-header")[0]
        dlg_header_ord = dlg_header.getElementsByTagName("span")[0]
        dlg_header_date = dlg_header.getElementsByTagName("span")[1]
        dlg_header_ord.innerHTML = parcelid
        dlg_header_date.innerHTML = creation_date
        from_edit = document.getElementById("from-edit")
        from_edit.getElementsByTagName("option")[0].innerHTML = source

        to_edit = document.getElementById("to-edit")

        for (i = 0; i < to_edit.length; i++) {
            to_edit.options[i].removeAttribute("selected")
        }

        for (i = 0; i < to_edit.length; i++) {
            if (to_edit.options[i].value === destination) {
                to_edit.options[i].setAttribute("selected", "selected")
            }
        }

        weight_edit = document.getElementById("weight-edit")
        price_edit = document.getElementById("price-edit")
        weight_edit.value = weight
        price_edit.value = price
        status_edit = document.getElementById("status-edit")
        status_edit.getElementsByTagName("option")[0].innerHTML = status
        location_edit = document.getElementById("location-edit")
        location_edit.value = current_location

        dlg_footer = dlg_box_edit.getElementsByClassName("dlg-footer")[0]
        dlg_footer_cancel_order = dlg_footer.getElementsByTagName("button")[1]
        dlg_footer_make_order = dlg_footer.getElementsByTagName("button")[2]

        dlg_footer_cancel_order.style.display = "inline-block"
        dlg_footer_make_order.style.display = "none"

        $('.dlg-wrapper-edit').fadeIn();
        $('.dlg-box-edit').fadeIn();
    }
}

save_changes = () => {
    event.preventDefault()
    username = document.getElementById("username").value
    email = document.getElementById("email").value
    address = document.getElementById("address").value
    phone = document.getElementById("phone").value
    old_password = document.getElementById("old-password").value
    new_password = document.getElementById("new-password").value
    confirm_password = document.getElementById("confirm-password").value

    if (username.trim() === "") {
        err_element = document.getElementById("error-one")
        err_element.innerHTML = "Username field cannot be empty"
        return false
    } else if (email.trim() === "") {
        err_element = document.getElementById("error-one")
        err_element.innerHTML = "Email field cannot be empty"
        return false
    } else if (phone.trim() === "") {
        err_element = document.getElementById("error-one")
        err_element.innerHTML = "Phone field cannot be empty"
        return false
    } else if (address.trim() === "") {
        err_element = document.getElementById("error-one")
        err_element.innerHTML = "Address field cannot be empty"
        return false
    }

    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {

    } else {
        err_element = document.getElementById("error-one")
        err_element.innerHTML = "Please provide a valid email"
        return false
    }

    if (old_password.trim() !== "") {
        if (old_password !== userData["password"]) {
            err_element = document.getElementById("error-one")
            err_element.innerHTML = "That is not your old password"
            return false
        }
        if (new_password.trim() === "") {
            err_element = document.getElementById("error-one")
            err_element.innerHTML = "Enter your new password"
            return false
        }
        if (confirm_password.trim() === "") {
            err_element = document.getElementById("error-one")
            err_element.innerHTML = "Confirm your new password"
            return false
        }
        if (confirm_password.trim() !== new_password.trim()) {
            err_element = document.getElementById("error-one")
            err_element.innerHTML = "Your passwords don't match"
            return false
        }
    }


    const auth = `Bearer ${localStorage.getItem("token")}`
    // const edit_url = `http://127.0.0.1:5000/api/v2/users/${userId}/edit`
    const edit_url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/edit`
    const edit_data = {
        username,
        email,
        address,
        phone,
        password: new_password
    }

    console.log(edit_data)

    fetch(edit_url, {
            method: "PUT",
            body: JSON.stringify(edit_data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))


    $('.dlg-wrapper-prof').fadeOut();
    $('.dlg-box-prof').fadeOut();

    $('.dlg-wrapper-alert').fadeIn();
    $('.dlg-box-alert').fadeIn()

}