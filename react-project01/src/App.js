function App() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f0f4f8, #d9e4f5)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        textAlign: "center",
        width: "320px",
        transition: "transform 0.3s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <img
          src="/nhan.jpg"
          alt="Ảnh cá nhân"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
            border: "4px solid #4a90e2"
          }}
        />
        <h1 style={{ color: "#333", marginBottom: "10px" }}>Phương Thiện Nhân</h1>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>🎂 Tuổi: 21</p>
        <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>🎓 MSSV: 22110387</p>
      </div>
    </div>
  ); 
}

export default App;
