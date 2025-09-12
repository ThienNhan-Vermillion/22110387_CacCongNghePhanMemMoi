import React, { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Card } from "./components/Card";

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), name: newItem.trim(), quantity: 1 }]);
    setNewItem("");
  };

  const updateItem = (id: number, quantity: number) => {
    setItems(items.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <Card title="🛒 Giỏ hàng">
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Tên sản phẩm..."
        />
        <Button label="Thêm" onClick={addItem} />
      </div>

      <ul>
        {items.map(item => (
          <li key={item.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {item.name} - SL:
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={e => updateItem(item.id, parseInt(e.target.value || "1", 10))}
              style={{ width: 60, padding: 4 }}
            />
            <Button label="Xóa" onClick={() => removeItem(item.id)} />
          </li>
        ))}
      </ul>
    </Card>
  );
};


