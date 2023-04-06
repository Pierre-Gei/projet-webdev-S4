const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const {productGet, productPost, productDelete, productPut} = require('./productController');
const {messageGet, messagePost, messageDelete, messagePut} = require('./messageController');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(session({
    secret: 'secret',
    name :'cookieListeApplication'
}));

app.use(bodyParser.json());
app.use(cors());

app.get('/products', productGet);
app.post('/products', productPost);
app.delete('/products/:id', productDelete);
app.put('/products/:id', productPut);

app.get('/messages', messageGet);
app.post('/messages', messagePost);
app.delete('/messages/:id', messageDelete);
app.put('/messages/:id', messagePut);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

