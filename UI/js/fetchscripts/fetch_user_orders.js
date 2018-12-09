window.onload = () => {
    const token = localStorage.getItem("token")
    data = JSON.parse(atob(token.split('.')[1]))
    userData = data["identity"]
    // console.log(`Data: ${JSON.stringify(userData)}`)

    userId = userData["userid"]
    const url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/parcels`
    // const url = `http://127.0.0.1:5000/api/v2/users/${userId}/parcels`
    const auth = `Bearer ${localStorage.getItem("token")}`

    fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(parcel => handledata(parcel))
        })
        .catch(err => `Error: ${err}`)
}


handledata = parcel => {
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
    } else if(status === "Delivered") {
        div_item.classList.add("list-item", "item-delivered")
    } else if(status === "In Transit") {
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
                
        
        if(cancel_status === "Cancelled"){
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