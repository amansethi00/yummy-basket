const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.connect');
const app = express();
const {products,addToProducts} = require('./database/products.data');
db();
const productRouter = require('./routes/products.route');
const signUpRoute = require('./routes/signup.route');
const loginRoute = require('./routes/login.route');
const wishlistRoute = require('./routes/wishlist.route');
const cartRoute = require('./routes/cart.route');
const addressRouter = require('./routes/address.route');
const authMiddleware = require('./middleware/auth.midlleware');

//middleware
app.use(bodyParser.json());
app.use(cors());

// addding to products database
// for(let product of products){
//    addToProducts(product);
// }

//routes
app.use('/products',productRouter);
app.use('/signup',signUpRoute);
app.use('/login',authMiddleware,loginRoute);
app.use('/wishlist',authMiddleware,wishlistRoute);
app.use('/cart',authMiddleware,cartRoute);
app.use('/address',authMiddleware,addressRouter);
//default api page
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

// error handler 
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ success: false, message: err.message })
})
// 404 handler DO NOT MOVE
app.use(function(req, res, next) {
  res.status(404).json("Sorry can't find that!")
})

app.listen(3000, () => {
  console.log('server started');
});


