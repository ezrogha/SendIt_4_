dlg_box_edit = document.getElementsByClassName("dlg-box-edit")[0]
dlg_footer = dlg_box_edit.getElementsByClassName("dlg-footer")[0]
dlg_footer_discard = dlg_footer.getElementsByClassName("btn")[0]
dlg_footer_save = dlg_footer.getElementsByClassName("btn")[1]

dlg_footer_save.onclick = () => {
    dlg_status = document.getElementById("status").value
    dlg_location = document.getElementById("location-edit").value
    dlg_parcelId = document.getElementById("parcelId").innerHTML

    const loc_data = {
        current_location: dlg_location
    }
    // const loc_url = `http://127.0.0.1:5000/api/v2/parcels/${dlg_parcelId}/location`;
    const loc_url = `https://sendit-updated.herokuapp.com/api/v2/parcels/${dlg_parcelId}/location`;
    const auth = `Bearer ${localStorage.getItem("token")}`;

    fetch(loc_url, {
            method: "PUT",
            body: JSON.stringify(loc_data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch(err => console.log(`Error: ${err}`));


    const sta_data = {
        status: dlg_status
    }
    // const sta_url = `http://127.0.0.1:5000/api/v2/parcels/${dlg_parcelId}/status`;
    const sta_url = `https://sendit-updated.herokuapp.com/api/v2/parcels/${dlg_parcelId}/status`;

    fetch(sta_url, {
            method: "PUT",
            body: JSON.stringify(sta_data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch(err => console.log(`Error: ${err}`));


    setTimeout(() => {
        location.reload()
    }, 2000)
}