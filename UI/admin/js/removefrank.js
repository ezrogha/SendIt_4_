window.onload = () => {
    // const url = "http://127.0.0.1:5000/api/v2/user/frank"
    const url = "https://sendit-updated.herokuapp.com/api/v2/user/frank"
    const auth = `Bearer ${localStorage.getItem("token")}`;

    fetch(url, {
            method: "PUT",
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
}