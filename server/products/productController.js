const ProductModal = require('./productModel');

const addProduct = (req, res) => {
    console.log(req.body.bodyData);
    const product = new ProductModal({    //req.body

        adTitle: req.body.bodyData.adTitle,
        category: req.body.bodyData.category,
        adDescription: req.body.bodyData.adDescription,
        price: req.body.bodyData.price,
        name: req.body.bodyData.name,
        number: req.body.bodyData.number,
        province: req.body.bodyData.province
        // productImage: req.file.path
    });

    product.save()
        .then(doc => res.status(200).send({
            product: doc,
        })).catch((error) => {
            res.send({ error });
        })
};

const getAllProduct = (req, res) => {
    const id = req.params.id;
    ProductModal.find().then(docs => {
        const response = { 
            count: docs.length,
            allProducts: docs.map(doc => {
                return {
                    adTitle: doc.adTitle,
                    category: doc.category,
                    adDescription: doc.adDescription,
                    price: doc.price,
                    _id: doc._id,
                    name: doc.name,
                    number: doc.number,
                    province: doc.province,
                    productImage: 'http://localhost:8080/' + doc.productImage,                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/products/search/' + doc._id
                    }
                }
            })
        }
        res.send(response);
    });
};
const searchProduct = (req, res) => {
    const id = req.params.id;
    ProductModal.findOne({
        '_id': id
    }).then(doc => {
        res.send({
            adTitle: doc.adTitle,
            category: doc.category,
            adDescription: doc.adDescription,
            price: doc.price,
            _id: doc._id,
            name: doc.name,
            number: doc.number,
            province: doc.province,
            productImage: doc.productImage,                    
            request: {
                type: 'GET',
                url: 'http://localhost:8080/products/search/' + doc._id
            }
        }) 
       }).catch(error => {
        res.send({ error });
    })
}
const searchByCategory = (req, res) => {
    console.log(req.body.bodyData.category);
    ProductModal.find({
        'category': req.body.bodyData.category
    }).then(docs => {
        const response = { 
            count: docs.length,
            allProducts: docs.map(doc => {
                return {
                    adTitle: doc.adTitle,
                    category: doc.category,
                    adDescription: doc.adDescription,
                    price: doc.price,
                    _id: doc._id,
                    name: doc.name,
                    number: doc.number,
                    province: doc.province,
                    // productImage: doc.productImage,                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/products/search/' + doc._id
                    }
                }
            })
        }
        res.send(response);
        }).catch(error => res.send({ error }
        ));
    }
const searchByName = (req, res) => {
    console.log(req.body.bodyData.adTitle);
    ProductModal.find({
        'adTitle': req.body.bodyData.adTitle
    }).then(docs => {
        const response = { 
            count: docs.length,
            allProducts: docs.map(doc => {
                return {
                    adTitle: doc.adTitle,
                    category: doc.category,
                    adDescription: doc.adDescription,
                    price: doc.price,
                    _id: doc._id,
                    name: doc.name,
                    number: doc.number,
                    province: doc.province,
                    // productImage: doc.productImage,                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/products/search/' + doc._id
                    }
                }
            })
        }
        res.send(response);
        }).catch(eror => res.send({ error }));
    }


const deleteProduct = (req, res, next) => {
    const id = req.params.id;
    ProductModal.remove({
        '_id': id
    }).then(doc => {
        res.send({
            product: doc
        }).catch(error => res.send(error));
    })
}
module.exports = {
    addProduct,
    getAllProduct,
    searchProduct,
    searchByCategory,
    searchByName,
    deleteProduct
}