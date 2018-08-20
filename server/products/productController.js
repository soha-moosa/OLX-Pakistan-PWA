const ProductModal = require('./productModel');

const addProduct = (req, res) => {
    const product = new ProductModal(req.body);
    product.save()
    .then(doc => res.status(200).send({
        product: doc
    })).catch((error)=>{
        res.send({error});
    })
};

const getAllProduct = (req, res) =>{
    ProductModal.find().then(docs =>{
        res.send({
            allProducts: docs
        })
    })
};
const searchProduct = (req, res) =>{
 const id = req.params.id;
 
    ProductModal.find({
        '_id': id
    }).then(doc => {
        res.send({
            product: doc
        })
    }).catch(error => {
        res.send({error});
    })
}
const searchByCategory = (req, res) =>{ 
  ProductModal.find({
      'category': req.body.category
  }).then(docs =>{
      res.send({
          products: docs
      }).catch(error=> res.send({error}));
  })
}
const searchByName = (req, res) => {
    ProductModal.find({
        'adTitle': req.body.adTitle
    }).then(docs =>{
        res.send({
            products: docs 
        }).catch(eror => res.send({error}));
    })
}
module.exports = {
    addProduct,
    getAllProduct,
    searchProduct,
    searchByCategory,
    searchByName
}