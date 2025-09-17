const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    recentlyViewed: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        viewedAt: { type: Date, default: Date.now }
    }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;

