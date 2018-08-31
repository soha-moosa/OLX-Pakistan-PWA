let searchAllProduct = [];

const getAllProducts = () => {

    fetch(`http://localhost:8080/products/allProduct`, {
        method: "GET"
    }).then(res => {
        return res.json();
    })
        .then(data => {
            displayToDom(data.allProducts);
            searchAllProduct = [...data.allProducts];
        });
}

const searchProductOfThisName = () => {
    const searchProduct = document.getElementById('SearchName').value;
    let searchedItemsReturned = searchAllProduct.filter(product => {
        return product.adTitle === searchProduct;
    })
    console.log(searchedItemsReturned);
}

const displayToDom = (products) => {
    const productShowCase = document.getElementById('productShowCase');
    productShowCase.innerHTML = '';
    products.map((singleProduct) => {
        let ProductCard = `
            <div class="col-md-3 m-3">
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1658b83c1ae%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1658b83c1ae%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E">
            <div class="card-body">
                <h5 class="card-title">${singleProduct.adTitle}</h5>
                <p class="card-text">${singleProduct.adDescription}</p>
                <p class="card-text">Category: ${singleProduct.category}</p>
                <h6 class="card-text">Price: <span class="text-success"> ${singleProduct.price} </span></h6> 
            </div>
            <div class="card-footer">
            <a href="#" class="btn btn-primary"><i class="fa fa-star"></i> add to fav</a>
            <a href="#" class="btn btn-primary"><i class="fa fa-info"></i> view details</a>
            
            </div>
        </div>
        </div>
        `
        productShowCase.innerHTML += ProductCard;
    })
};

const searchProductOfThisCategory = (category) => {
    fetch('http://localhost:8080/products/searchByCategory', {
        method: "POST",
        body: JSON.stringify({
            bodyData: {
                category
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json()
    }).then(products => {
        displayToDom(products.allProducts);
    });

}

// document.getElementById("searchForm").addEventListener("submit", (event) => {
//     event.preventDefault();
//     const adTitle = document.getElementById('SearchName').value.toUpperCase();
//     console.log(adTitle);
//     fetch('http://localhost:8080/products/searchByName', {
//         method: "POST",
//         body: JSON.stringify({
//             bodyData: {
//                 adTitle
//             }
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then(res => {
//         return res.json()
//     }).then(product => {
//         console.log(product);
//     });
// })
