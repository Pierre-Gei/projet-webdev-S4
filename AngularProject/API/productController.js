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
