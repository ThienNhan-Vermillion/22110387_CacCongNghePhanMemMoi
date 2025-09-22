import React from 'react'
import { useCart } from '../components/context/cart.context.jsx'
import { checkoutApi } from '../utils/api'

const CartPage = () => {
  const { items, updateQty, removeItem, clear, total } = useCart()

  const onCheckout = async () => {
    try {
      const payload = items.map(i => ({ productId: i.product._id, quantity: i.quantity }))
      const res = await checkoutApi(payload)
      if (res?.EC === 0) {
        alert('Thanh toán thành công (demo)!')
        clear()
      } else {
        alert(res?.EM || 'Checkout failed')
      }
    } catch (e) {
      alert(e?.EM || 'Checkout failed')
    }
  }

  return (
    <div>
      <h1>Giỏ hàng</h1>
      {items.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="cart-list">
            {items.map(({ product, quantity }) => (
              <div key={product._id} className="cart-item" style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 0', borderBottom:'1px solid #eee' }}>
                <img src={product.image} alt={product.name} width={64} height={64} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600 }}>{product.name}</div>
                  <div>{new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(product.price)}</div>
                </div>
                <input type="number" min={1} value={quantity} onChange={e => updateQty(product._id, Math.max(1, Number(e.target.value)||1))} style={{ width:80 }} />
                <button onClick={() => removeItem(product._id)}>Xóa</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div><strong>Tổng:</strong> {new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(total)}</div>
            <button onClick={onCheckout}>Thanh toán</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage


