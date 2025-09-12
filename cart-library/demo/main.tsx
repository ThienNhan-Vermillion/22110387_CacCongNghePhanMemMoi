import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Input, Card, Modal, Cart } from "../src";

function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>cart-library demo</h1>
      <Card title="Components">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Input placeholder="Nhập gì đó..." />
          <Button label="Mở Modal" onClick={() => setOpen(true)} />
        </div>
      </Card>
      <div style={{ height: 16 }} />
      <Cart />
      <Modal open={open} onClose={() => setOpen(false)} title="Xin chào">
        Đây là modal mẫu từ thư viện.
      </Modal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);


