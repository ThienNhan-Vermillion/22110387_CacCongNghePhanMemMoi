import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { toggleFavoriteApi, addRecentlyViewedApi, getFavoritesApi } from '../../utils/api';

const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getFavoritesApi();
                const ids = (res?.DT || []).map(p => (p._id || p));
                setLiked(ids.includes(product._id));
            } catch (e) {}
        };
        init();
    }, [product._id]);

    const onToggleFavorite = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            const res = await toggleFavoriteApi(product._id);
            if (res?.EC === 0) setLiked(res.DT.liked);
        } catch (e) {}
    };

    const onCardClick = async () => {
        // Track as recently viewed when user clicks on product card
        try {
            await addRecentlyViewedApi(product._id);
        } catch (e) {}
    };

    // Remove automatic recently viewed tracking from card - only track when user clicks

    return (
        <div className="product-card" onClick={onCardClick}>
            <div className="product-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
                <button className={`favorite-btn ${liked ? 'active' : ''}`} onClick={onToggleFavorite} aria-label="favorite">
                    <span className="heart">{liked ? '❤' : '♡'}</span>
                </button>
                <div className="product-overlay">
                    <Link to={`/products/${product._id}`} className="view-details-btn">
                        Xem chi tiết
                    </Link>
                </div>
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                    <div className="stars">
                        {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                        ({product.reviews?.length || 0} đánh giá)
                    </span>
                </div>
                
                <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.discount > 0 && (
                        <span className="discount">-{product.discount}%</span>
                    )}
                </div>
                
                <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                    <span className="view-count">{product.viewCount || 0} lượt xem</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;







