const express = require('express');
const morgan = require('morgan');
const config = require('./config/config')
const database = require('./config/database');
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const bodyParser = require('body-parser')
const { createRoles, createAdmin } = require('./libs/initialSetup')


const app = express();
createRoles();
createAdmin();

database.connect();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'));

app.use('/product', productRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(config.PORT, () => {
    console.log(`Server on port ${config.PORT}`)
})