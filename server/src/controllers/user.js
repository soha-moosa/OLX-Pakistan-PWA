const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../products/productModel');
const signup = (req, res, next) => {
    User.findOne({
        "email": req.body.bodyData.email
    }).then(user => {
        if (user) {
            res.status(409).json({
                message: 'User already exists'
            });
        } else {
            bcrypt.hash(req.body.bodyData.password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        error: error
                    });
                } else {
                    const user = new User({
                        _id: req.params.id,
                        email: req.body.bodyData.email,
                        password: hash
                    });
                    user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User created"
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({
                                error: error
                            });
                        });
                }
            });
        }
    });
};

// login

const login = (req, res, next) => {
    User.findOne({
        "email": req.body.bodyData.email
    })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.bodyData.password, user.password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, "secret", {
                            expiresIn: "1h"
                        })
                    return res.status(200).json({
                        message: "Logged in successfully",
                        token: token,
                        _id: user._id
                    });
                }
                return res.status(401).json({
                    message: "Login failed"
                });
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });

};

const deleteUser = (req, res, next) => {
    User.remove({
        "_id": req.params.id
    }).then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
}

const addToFavoriteItemList = (req, res) => {
    const { productId, id } = req.body.bodyData;
    console.log(productId, id);

    Product.findOne({
        '_id': productId
    })
        .then((product) => {
            // res.send({ status: true });
            User.findOneAndUpdate({ '_id': id }, { $push: { favoriteProduct: product } }, { new: true }).then((response) => {
                console.log("__FINDEBYIDREPONSE__", response);
                res.send({ status: true, product });
            })
        })
        .catch((error) => {
            console.log(error);
            res.send({
                status: false,
                error
            })
        })
}


const getAllFavoriteItemList = (req, res) => {
    const id = req.body.bodyData.id;
    console.log(id);
    User.findOne({
        "_id": id
    })
        .then((response) => {
            res.send({ status: true, favoriteProduct: response.favoriteProduct });
        })
        .catch((error) => {
            console.log(error);
            res.send({
                status: false,
                error
            })
        })

}





module.exports = {
    signup,
    login,
    deleteUser,
    addToFavoriteItemList,
    getAllFavoriteItemList
}