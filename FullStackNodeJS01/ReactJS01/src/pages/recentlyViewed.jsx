import React, { useEffect, useState } from 'react'
import { getRecentlyViewedApi } from '../utils/api'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ProductCard from '../components/product/ProductCard'

const RecentlyViewedPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getRecentlyViewedApi()
        console.log('Recently viewed response:', res)
        if (res?.EC === 0) setItems((res.DT || []).map(x => x.product))
        else setError(res?.EM || 'Không tải được danh sách đã xem')
      } catch (e) {
        console.log('Recently viewed error:', e)
        setError(e?.EM || 'Không tải được danh sách đã xem')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <LoadingSpinner size="large" text="Đang tải sản phẩm đã xem..." />

  return (
    <div>
      <h1>Đã xem gần đây</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {items.length === 0 ? (
        <p>Bạn chưa xem sản phẩm nào.</p>
      ) : (
        <div className="product-grid">
          {items.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentlyViewedPage


