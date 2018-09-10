
document.getElementById("loginForm").addEventListener("submit", (event) => {
    const email = document.getElementById("input").value;
    const password = document.getElementById("password").value;
    // console.log(email);
    // console.log(password);

    event.preventDefault();
    fetch("http://localhost:8080/users/login", {
        method: "POST",

        body: JSON.stringify({
            bodyData: {
                email,
                password
            }

        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json()
    }).then(user => {
        localStorage.setItem('userId', user._id);        
        window.location.href = "../index.html";
    }).catch(error => {
        console.log(error);
    });
})