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
            <div class="col-md-3 m-4">
            <div class="card" style="width: 19rem;">
            <br>
            <img class="card-img-top" src="${singleProduct.imageURL}">
            <div class="card-body">
                <h5 class="card-title">${singleProduct.adTitle}</h5>
                <p class="card-text">Category: ${singleProduct.category}</p>
                <h6 class="card-text">Price: <span class="text-success"> ${singleProduct.price} </span></h6> 
            </div>
            <div class="card-footer">
            <button class="btn btn-primary" onclick="addTofavoriteProduct('${singleProduct._id}');"><i class="fa fa-star"></i> add to fav</button>
            <button class="btn btn-primary" onclick="viewDetails('${singleProduct._id}');"><i class="fa fa-info"></i> View Details</button>
                
            </div>
        </div>
        </div>
        `
        productShowCase.innerHTML += ProductCard;
    })
};

const displayFavoriteProductToDom = (products) => {
    const productShowCase = document.getElementById('productShowCase');
    productShowCase.innerHTML = '';
    products.map((singleProduct) => {
        let ProductCard = `
            <div class="col-md-3 m-3">
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${singleProduct.imageURL}">
            <div class="card-body">
                <h5 class="card-title">${singleProduct.adTitle}</h5>
                <p class="card-text">${singleProduct.adDescription}</p>
                <p class="card-text">Category: ${singleProduct.category}</p>
                <h6 class="card-text">Price: <span class="text-success"> ${singleProduct.price} </span></h6> 
            </div>
            // <div class="card-footer">
            // <a href="#" class="btn btn-primary"><i class="fa fa-star"></i> add to fav</a>
            // <a href="#" class="btn btn-primary"><i class="fa fa-info"></i> view details</a>
            
            // </div>
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

const addTofavoriteProduct = (productId, userId) => {
    let id = localStorage.getItem('userId');
    console.log(productId, id);
    fetch('http://localhost:8080/users/addToFavorite', {
        method: "POST",
        body: JSON.stringify({ bodyData: { productId, id } }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json()
    })
        .then(products => {
            swal("Added!", "This is your favorite Product", "success");
        });

}
// add fav k button p click krny p wo page khol rha hy?nahi nahi! sbr dikhata hun! 
function viewDetails(_id) {
    console.log('hello');
    fetch(`http://localhost:8080/products/searchById/${_id}`)
        .then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            document.getElementById('productMessage').innerHTML = `
           
            <img class="card-img-top" src="${data.imageURL}">
            
            <div class="card-body">
            
            <h5 class="card-title">${data.adTitle}</h5>
            <h6 class="card-text">Price: <span class="text-success"> ${data.price} </span></h6> 
            <p class="card-text">Category: ${data.category}</p>            
            <p class="card-text">${data.adDescription}</p>
            <p class="card-text">Category: ${data.category}</p>
            <p class="card-text">Name: ${data.name}</p>
            <p class="card-text">Contact: ${data.number}</p>
            <p class="card-text">Province: ${data.province}</p>
                
            </div>
         
            `;
            $('#myModal').modal('show');
            // document.getElementById('myModal').setAttribute('show','show');
        }).catch(error => {
            console.log(error);
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
