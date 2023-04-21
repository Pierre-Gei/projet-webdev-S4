const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017';

exports.messageGet = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        let datas = await dbo.collection("messages").find({}).toArray();
        res.status(200).json(datas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err });
    }
};

exports.messagePost = async function (req, res) {
    let message = req.body;
    try {
        if (message.title == null || message.title == "") {
            res.status(400).json({ message: "Missing title" });
        } 
        else {
            db = await MongoClient.connect(url);
            let dbo = db.db("products");
            let data = await dbo.collection("messages").insertOne(message);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err });
    }
}

exports.messageDelete = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        await dbo.collection("messages").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

exports.messagePut = async function (req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        await dbo.collection("messages").updateOne({_id: new mongodb.ObjectId(req.params.id)}, {$set: {read: req.body.read}});
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};