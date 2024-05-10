// controllers/authController.js
const express = require('express');
const authService = require('../../service/user/UserService');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
        const token = await authService.login(email, password);
        res.status(200).json(token );
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
