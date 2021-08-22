const Product = require('../models/Product')
const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ message: error });
        }
        return next();
    });
};

exports.createProduct = async(req, res, next) => {
    const product = new Product(req.body);
    try {
        if (req.file && req.file.filename) {
            product.image = req.file.filename;
        }
        await product.save();
        res.json({ message: 'nuevo producto' })
    } catch (error) {
        res.send({ error })
    }
}

exports.getProduct = async(req, res, next) => {
    const product = await Product.find();
    res.json(product)
}

exports.update = async(req, res, next) => {
    try {
        let newProduct = req.body;

        if (req.file && req.file.filename) {
            newProduct.image = req.file.filename;
        } else {
            const product = await Product.findById(req.params.id)
            newProduct.image = product.image;
        }

        const productUpdated = await Product.findOneAndUpdate({ _id: req.params.id },
            newProduct, { new: true }
        );
        res.json({
            message: 'el producto se ha actualizado'
        })

    } catch (error) {

        if (error.code === 11000) {
            res.status(400).json({
                message: `ya existe un producto con el sku: ${req.body.id}`
            });
        } else {
            res.status(400).json({
                message: 'error al procesar la peticion '
            })
        }
    }

}

exports.removeProduct = async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'el producto ha sido eliminado' })

    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        })
    }

}

exports.show = (req, res) => {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.product) return res.status(404).send({ message: 'NOT FOUND' })
    let product = req.body.product;
    return res.status(200).send(product);
}

exports.search = async(req, res, next) => {
    try {
        const product = await Product.find({
                name: new RegExp(req.params.query, 'i'),
            })
            .populate('User')
            .populate({
                path: 'user',

                model: 'User'
            });
        res.json(product);

    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        })
    }
}

exports.find = (req, res, next) => {
    let query = {};
    query[req.params.key] = req.params.value
    Product.find(query).then(product => {
        if (!product.length) return next();
        req.body.product = product;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
}
exports.productUser = async(req, res) => {
    const product = await Product.find({ user: req.user.id })
    res.json(product);
};