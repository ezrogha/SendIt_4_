dlg_box_edit = document.getElementsByClassName("dlg-box-edit")[0]
dlg_footer = dlg_box_edit.getElementsByClassName("dlg-footer")[0]
dlg_footer_cancel_order = dlg_footer.getElementsByTagName("button")[1]

dlg_footer_cancel_order.onclick = () => {
    event.preventDefault()
    dlg_header_ord = dlg_header.getElementsByTagName("span")[0]
    parcelid = dlg_header_ord.innerHTML

    const auth = `Bearer ${localStorage.getItem("token")}`
    const url = `https://sendit-updated.herokuapp.com/api/v2/parcels/${parcelid}/cancel`
    // const url = `http://127.0.0.1:5000/api/v2/parcels/${parcelid}/cancel`

    fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => 
            console.log(data)
        )

    $('.dlg-wrapper-edit').fadeOut();
    $('.dlg-box-edit').hide();

    setTimeout(() => {
        location.reload()
    }, 2000)
}