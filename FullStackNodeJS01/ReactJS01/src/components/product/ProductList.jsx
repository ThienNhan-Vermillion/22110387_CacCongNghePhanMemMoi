import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { getProductsApi, filterProductsApi } from '../../utils/api';
import './ProductList.css';

const ProductList = ({ 
    category = null, 
    searchTerm = null, 
    showFilters = true,
    itemsPerPage = 6,
    searchResults = null,
    filters = {}
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || 'all');
    const [search, setSearch] = useState(searchTerm || '');

    // Hàm chuyển đổi tên danh mục sang tiếng Việt
    const getCategoryDisplayName = (category) => {
        const categoryNames = {
            'electronics': 'Điện tử',
            'clothing': 'Thời trang',
            'books': 'Sách',
            'home': 'Gia dụng',
            'sports': 'Thể thao',
            'beauty': 'Làm đẹp',
            'toys': 'Đồ chơi',
            'food': 'Thực phẩm'
        };
        return categoryNames[category] || category;
    };

    // Fetch products
    const fetchProducts = useCallback(async (page = 1, reset = false) => {
        try {
            setLoading(true);
            setError(null);


            const paramsObj = {
                page: page.toString(),
                limit: itemsPerPage.toString()
            };

            if (selectedCategory && selectedCategory !== 'all') {
                paramsObj.category = selectedCategory;
            }

            if (search) {
                paramsObj.search = search;
            }

            const response = await getProductsApi(paramsObj);

            if (response.EC === 0) {
                const newProducts = response.DT.products;

                setProducts(newProducts);
                const pagination = response.DT.pagination || {};
                setTotalPages(pagination.totalPages || 1);
                setTotalItems(pagination.totalItems || newProducts.length);
                setCurrentPage(pagination.currentPage || page);
            } else {
                setError(response.EM);
            }
        } catch (err) {
            setError('Lỗi khi tải sản phẩm');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, search, itemsPerPage]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/v1/api/products/categories');
            const data = await response.json();
            
            if (data.EC === 0) {
                setCategories(data.DT);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Navigate to page
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        fetchProducts(page, true);
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setProducts([]);
        fetchProducts(1, true);
    };

    // Handle search
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        setCurrentPage(1);
        setProducts([]);
        fetchProducts(1, true);
    };

    // Apply filters from AdvancedSearch
    const applyFilters = async () => {
        try {
            setLoading(true);
            setError(null);

            // Build params and clean empty values
            const paramsObj = {
                page: 1,
                limit: itemsPerPage.toString(),
                ...filters,
            };
            Object.keys(paramsObj).forEach((key) => {
                const val = paramsObj[key];
                if (val === '' || val === undefined || val === null) {
                    delete paramsObj[key];
                }
            });
            if (paramsObj.minPrice !== undefined) paramsObj.minPrice = Number(paramsObj.minPrice);
            if (paramsObj.maxPrice !== undefined) paramsObj.maxPrice = Number(paramsObj.maxPrice);
            if (paramsObj.minRating !== undefined) paramsObj.minRating = Number(paramsObj.minRating);
            if (paramsObj.minDiscount !== undefined) paramsObj.minDiscount = Number(paramsObj.minDiscount);

            const response = await filterProductsApi(paramsObj);

            if (response.EC === 0) {
                setProducts(response.DT.products);
                const pagination = response.DT.pagination || {};
                setTotalPages(pagination.totalPages || 1);
                setTotalItems(pagination.totalItems || response.DT.products.length);
                setCurrentPage(pagination.currentPage || 1);
            } else {
                setError(response.EM);
            }
        } catch (err) {
            setError('Lỗi khi áp dụng bộ lọc');
            console.error('Error applying filters:', err);
        } finally {
            setLoading(false);
        }
    };

    // Remove infinite scroll; use numbered pagination

    // Handle search results from AdvancedSearch
    useEffect(() => {
        if (searchResults) {
            setProducts(searchResults.products);
            if (searchResults.pagination) {
                setTotalPages(searchResults.pagination.totalPages || 1);
                setTotalItems(searchResults.pagination.totalItems || searchResults.products.length);
                setCurrentPage(searchResults.pagination.currentPage || 1);
            }
            setLoading(false);
        }
    }, [searchResults]);

    // Handle filters from AdvancedSearch
    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            // Apply filters and search
            applyFilters();
        }
    }, [filters]);

    // Initial load
    useEffect(() => {
        if (!searchResults) {
            fetchProducts(1, true);
            fetchCategories();
        }
    }, [searchResults]);

    // Reset when category or search changes
    useEffect(() => {
        if (category !== selectedCategory || searchTerm !== search) {
            setSelectedCategory(category || 'all');
            setSearch(searchTerm || '');
            setCurrentPage(1);
            setProducts([]);
            fetchProducts(1, true);
        }
    }, [category, searchTerm]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h3>Lỗi khi tải sản phẩm</h3>
                <p>{error}</p>
                <button onClick={() => fetchProducts(1, true)} className="retry-btn">
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            {showFilters && (
                <div className="product-filters">
                    
                    <div className="category-filters">
                        <button
                            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('all')}
                        >
                            Tất cả
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {getCategoryDisplayName(cat)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">
                        <h3>Không tìm thấy sản phẩm nào</h3>
                        <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
                    </div>
                )}
            </div>

            {products.length > 0 && (
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        « Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => goToPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        className="page-btn"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau »
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
