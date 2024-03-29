const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.login = async function (req, res) {
    let utilisateur = req.body;
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("products");
        let utilisateurs = await dbo.collection("users").find({ login: utilisateur.login }).toArray();
        if (utilisateurs.length > 0) {
            if (!bcrypt.compareSync(utilisateur.password, utilisateurs[0].password)) {
                res.status(401).json({ message: 'Unauthorized' });
                return
            }
            else {
                req.session.user = { "name": utilisateur.login, "id": utilisateurs[0]._id };
                res.status(200).end();
            }
        } else {

            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
}

exports.logout = async function (req, res) {
    if (req.session)
        await req.session.destroy();
    res.status(200).end();
};

exports.isConnected = async function (req, res) {
    res.status(200).end();
};


exports.signIn = async function (req, res) {
    let utilisateur = req.body;
    try {
        if (utilisateur.login == "" || utilisateur.password == "") {
            res.status(400).json({ message: 'Login et mot de passe obligatoire' });
            return
        }
        else {
            db = await MongoClient.connect(url);
            let dbo = db.db("products");
            let existingUser = await dbo.collection("users").findOne({});
            if (existingUser) {
                res.status(400).json({ message: "Impossible de créer un deuxième utilisateur" });
                return
            }
            else {
                utilisateur.password = bcrypt.hashSync(utilisateur.password, 10);
                await dbo.collection("users").insertOne(utilisateur);
                res.status(200).send();
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
}
