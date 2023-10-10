import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import userRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

connectDB(); //Connect to MongoDB


const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// cookie parser middleware 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is working...')
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})  