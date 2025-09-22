const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    searchProducts,
    addReview,
    getProductsByCategory,
    getFeaturedProducts,
    fuzzySearch,
    filterProductsAdvanced,
    getSearchSuggestionsController,
    getFilterOptionsController,
    updateViewCount
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes (không cần authentication)
router.get('/test', (req, res) => {
    res.json({ message: 'API hoạt động bình thường!' });
});
router.get('/', getProducts); // Lấy tất cả sản phẩm
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/fuzzy-search', fuzzySearch);
router.get('/filter', filterProductsAdvanced);
router.get('/:id/similar', async (req, res) => {
    try {
        const Product = require('../models/product');
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ EC: 2, EM: 'Không tìm thấy sản phẩm', DT: null });
        const similar = await Product.find({
            _id: { $ne: id },
            isActive: true,
            $or: [
                { category: product.category },
                { tags: { $in: product.tags || [] } }
            ]
        }).limit(10);
        return res.status(200).json({ EC: 0, EM: 'OK', DT: similar });
    } catch (e) {
        return res.status(500).json({ EC: 1, EM: 'Lỗi server', DT: null });
    }
});

router.get('/:id/stats', async (req, res) => {
    try {
        const Product = require('../models/product');
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ EC: 2, EM: 'Không tìm thấy sản phẩm', DT: null });
        const uniqueCommenters = new Set((product.reviews || []).map(r => (r.user || '').toString()));
        const commentsCount = uniqueCommenters.size;
        const uniqueBuyers = new Set((product.buyers || []).map(b => b.toString()));
        const purchasedCount = uniqueBuyers.size || product.purchasedCount || 0;
        return res.status(200).json({ EC: 0, EM: 'OK', DT: { purchasedCount, commentsCount, viewCount: product.viewCount || 0 } });
    } catch (e) {
        return res.status(500).json({ EC: 1, EM: 'Lỗi server', DT: null });
    }
});
router.get('/suggestions', getSearchSuggestionsController);
router.get('/filter-options', getFilterOptionsController);
router.get('/:id', getProductById);
router.put('/:id/view', updateViewCount);

// Protected routes (cần authentication)
router.use(auth);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/reviews', addReview);

module.exports = router;
