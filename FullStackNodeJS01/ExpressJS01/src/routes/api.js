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

// Demo checkout endpoint: adds items and updates product buyers/purchasedCount, stock, soldCount
routerAPI.post('/checkout', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ EC: 2, EM: 'User not found', DT: null });
        const items = req.body?.items || [];
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ EC: 1, EM: 'Giỏ hàng trống', DT: null });
        }
        const productMap = new Map(items.map(i => [i.productId, i.quantity || 1]));
        const ids = [...productMap.keys()].filter(Boolean);
        const products = await Product.find({ _id: { $in: ids } });
        for (const p of products) {
            const qty = productMap.get(p._id.toString()) || 1;
            const alreadyBuyer = (p.buyers || []).some(b => b.toString() === user._id.toString());
            if (!alreadyBuyer) {
                p.buyers = [...(p.buyers || []), user._id];
                p.purchasedCount = (p.purchasedCount || 0) + 1;
            }
            p.soldCount = (p.soldCount || 0) + qty;
            if (typeof p.stock === 'number') {
                p.stock = Math.max(0, p.stock - qty);
            }
            await p.save();
        }
        return res.status(200).json({ EC: 0, EM: 'Thanh toán thành công (demo)', DT: { purchased: products.length } });
    } catch (e) {
        console.log('Checkout error:', e);
        return res.status(500).json({ EC: 1, EM: 'Server error', DT: null });
    }
});

module.exports = routerAPI; //export default

