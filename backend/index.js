//require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.js'); 
const app = express();

app.use(bodyParser.json()); 
app.use(cors()); 

const authRoutes = require('./routes/authRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 
const companyRoutes = require('./routes/companyRoutes'); 

app.use('/api', authRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/company', companyRoutes); 


app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down');
    db.end(); 
    process.exit();
});
