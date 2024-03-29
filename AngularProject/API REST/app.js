const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const {productGet, productPost, productDelete, productPut} = require('./productController');
const {messageGet, messagePost, messageDelete, messagePut} = require('./messageController');
const {signIn, login, logout, isConnected} = require('./authController');

const cors = require('cors');

const app = express();
const port = 3000;

app.use(session({
    secret: 'secret',
    name :'cookieListeApplication'
}));

app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

app.post ('/signIn', signIn);
app.post ('/login', login);
app.post ('/logout', logout);
app.get ('/isConnected', checkAuth, isConnected);


app.get('/products', productGet);
app.post('/products', checkAuth, productPost);
app.delete('/products/:id', checkAuth, productDelete);
app.put('/products/:id', checkAuth, productPut);

app.get('/messages', checkAuth, messageGet);
app.post('/messages', messagePost);
app.delete('/messages/:id', checkAuth, messageDelete);
app.put('/messages/:id', checkAuth, messagePut);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

