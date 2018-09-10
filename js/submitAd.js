
document.getElementById("submitAdForm").addEventListener("submit", (event) => {
    event.preventDefault();


    const adTitle = document.getElementById("ad-title").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const adDescription = document.getElementById("ad-description").value;
    const name = document.getElementById("name").value;
    const number = document.getElementById("phone-number").value;
    const province = document.getElementById("province").value;

    document.getElementById("ad-title").value = '';
    document.getElementById("category").value = '';
    document.getElementById("price").value = '';
    document.getElementById("ad-description").value = '';
    document.getElementById("name").value = '';
    document.getElementById("phone-number").value = '';
    document.getElementById("province").value = '';

    fetch("http://localhost:8080/products/addProduct", {
        method: "POST",
        body: JSON.stringify({
            bodyData: {
                adTitle,
                category,
                adDescription,
                price,
                name,
                number,
                province,
                imageURL
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        document.getElementById('productMessage').innerHTML = "Product Added!";
        $('#myModal').modal('show');
        // document.getElementById('myModal').setAttribute('show','show');
    }).catch(error => {
        console.log(error);
    });
})



let imageURL = "";
$(document).ready(function () {
    $("#inputFileToLoad").change(function () {
        let fileSelected = document.getElementById("inputFileToLoad").files;
        if (fileSelected.length > 0) {
            let fileToLoad = fileSelected[0];
            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var base64value = fileLoadedEvent.target.result;
                console.log(base64value);
                imageURL = base64value;
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    });
});
