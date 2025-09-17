import React, { useEffect, useState } from 'react'
import { getFavoritesApi } from '../utils/api'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ProductCard from '../components/product/ProductCard'

const FavoritesPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getFavoritesApi()
        console.log('Favorites response:', res)
        if (res?.EC === 0) setItems(res.DT || [])
        else setError(res?.EM || 'Không tải được danh sách yêu thích')
      } catch (e) {
        console.log('Favorites error:', e)
        setError(e?.EM || 'Không tải được danh sách yêu thích')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <LoadingSpinner size="large" text="Đang tải danh sách yêu thích..." />

  return (
    <div>
      <h1>Sản phẩm yêu thích</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {items.length === 0 ? (
        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
      ) : (
        <div className="product-grid">
          {items.map(p => (
            <ProductCard key={p._id || p} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage


