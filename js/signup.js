
document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("input").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    fetch("http://localhost:8080/users/signup", {
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
    }).then(user =>{
        window.location.href = "../html/index.html";
    }).catch(error => {
        console.log(error);
    })
})