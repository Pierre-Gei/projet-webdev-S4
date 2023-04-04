const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const {productGet} = require('./productController');
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

