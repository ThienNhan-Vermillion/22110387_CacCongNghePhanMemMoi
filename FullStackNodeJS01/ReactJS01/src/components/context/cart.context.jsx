import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(p => p.product._id === product._id)
      if (existing) {
        return prev.map(p => p.product._id === product._id ? { ...p, quantity: p.quantity + quantity } : p)
      }
      return [...prev, { product, quantity }]
    })
  }

  const updateQty = (productId, quantity) => {
    setItems(prev => prev.map(p => p.product._id === productId ? { ...p, quantity } : p))
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(p => p.product._id !== productId))
  }

  const clear = () => setItems([])

  const total = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}


