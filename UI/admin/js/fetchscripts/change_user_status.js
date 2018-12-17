dlg_box = document.getElementsByClassName("dlg-box")[0]
dlg_footer = dlg_box.getElementsByClassName("dlg-footer")[0]
dlg_footer_btn = dlg_footer.getElementsByTagName("a")[0]
dlg_footer_btn.onclick = () => {
    dlg_body = dlg_box.getElementsByClassName("dlg-body")[0]
    dlg_body_id = dlg_body.getElementsByTagName("span")[0]
    userId = dlg_body_id.innerHTML
    dlg_body_state = dlg_body.getElementsByTagName("i")[0]
    state = dlg_body_state.innerHTML
    if (state === "activate") {
        data = {
            status: "active"
        }
    } else {
        data = {
            status: "not active"
        }
    }

    // const url = `http://127.0.0.1:5000/api/v2/users/${userId}/status`
    const url = `https://sendit-updated.herokuapp.com/api/v2/users/${userId}/status`
    const auth = `Bearer ${localStorage.getItem("token")}`;
    fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(`Error: ${err}`));

    setTimeout(() => {
        location.reload()
    }, 2000)

}