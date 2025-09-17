const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const User = require('../models/user');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Public routes (không cần authentication)
routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

// Protected routes (cần authentication)
routerAPI.use(auth);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

// Favorites
routerAPI.post('/favorites/:productId', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { productId } = req.params;
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ EC: 2, EM: 'User not found', DT: null });
        const exists = user.favorites.some(id => id.toString() === productId);
        if (exists) {
            user.favorites = user.favorites.filter(id => id.toString() !== productId);
        } else {
            user.favorites.push(productId);
        }
        await user.save();
        return res.status(200).json({ EC: 0, EM: 'OK', DT: { favorites: user.favorites, liked: !exists } });
    } catch (e) {
        console.log('Error in favorites:', e);
        return res.status(500).json({ EC: 1, EM: 'Server error', DT: null });
    }
});

routerAPI.get('/favorites', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail }).populate('favorites');
        return res.status(200).json({ EC: 0, EM: 'OK', DT: user?.favorites ?? [] });
    } catch (e) {
        console.log('Error getting favorites:', e);
        return res.status(500).json({ EC: 1, EM: 'Server error', DT: null });
    }
});

// Recently viewed
routerAPI.post('/recently-viewed/:productId', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { productId } = req.params;
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ EC: 2, EM: 'User not found', DT: null });
        user.recentlyViewed = (user.recentlyViewed || []).filter(x => x.product.toString() !== productId);
        user.recentlyViewed.unshift({ product: productId, viewedAt: new Date() });
        user.recentlyViewed = user.recentlyViewed.slice(0, 20);
        await user.save();
        return res.status(200).json({ EC: 0, EM: 'OK', DT: user.recentlyViewed });
    } catch (e) {
        console.log('Error in recently viewed:', e);
        return res.status(500).json({ EC: 1, EM: 'Server error', DT: null });
    }
});

routerAPI.get('/recently-viewed', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail }).populate('recentlyViewed.product');
        return res.status(200).json({ EC: 0, EM: 'OK', DT: user?.recentlyViewed ?? [] });
    } catch (e) {
        console.log('Error getting recently viewed:', e);
        return res.status(500).json({ EC: 1, EM: 'Server error', DT: null });
    }
});

module.exports = routerAPI; //export default

