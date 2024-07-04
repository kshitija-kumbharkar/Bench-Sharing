const express = require('express');
const router = express.Router();
console.log("Before requiring User model");
const User = require('backend/models/userModel.js'); 
console.log("After requiring User model");

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const role = user.role;
        res.json({ success: true, role }); 

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

module.exports = router;



