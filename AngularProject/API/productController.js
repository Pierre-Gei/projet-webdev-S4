const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017';

exports.productGet = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        let datas = await dbo.collection("products").find({}).toArray();
        res.status(200).json(datas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err });
    }
};

exports.productPost = async function (req, res) {
    let product = req.body;
    try {
        if (product.name == null || product.name == "") {
            res.status(400).json({ message: "Le titre est obligatoire" });
        } 
        else {
            db = await MongoClient.connect(url);
            let dbo = db.db("products");
            let data = await dbo.collection("products").insertOne(product);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err });
    }
}

exports.productDelete = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        await dbo.collection("products").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

exports.productPut = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        await dbo.collection("products").updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: {name : req.body.name, quantity : req.body.quantity}});
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};