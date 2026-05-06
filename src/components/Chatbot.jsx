import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      type: "text",
      content: "Hey 👋 Welcome to Cova Kicks! Ask me about shoes."
    }
  ]);
  const [input, setInput] = useState("");

  const { products } = useContext(CartContext);

  // ⭐ STAR FUNCTION
  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    const empty = 5 - full;

    return (
      <div style={{ color: "#f5b50a", fontSize: "13px" }}>
        {"⭐".repeat(full)}
        {"☆".repeat(empty)}
      </div>
    );
  };

  // SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { sender: "user", type: "text", content: input }
    ]);

    const reply = getBotReply(input.toLowerCase());

    setTimeout(() => {
      setMessages(prev => [...prev, reply]);
    }, 400);

    setInput("");
  };

  // BOT LOGIC
  const getBotReply = (msg) => {

    // GREETING
    if (["hi", "hello", "hey"].some(w => msg.includes(w))) {
      return {
        sender: "bot",
        type: "text",
        content: "Hey 👋 Looking for sneakers or boots?"
      };
    }

    // SHOW PRODUCTS
    if (
      msg.includes("shoes") ||
      msg.includes("products") ||
      msg.includes("available")
    ) {
      return {
        sender: "bot",
        type: "products",
        content: products.slice(0, 5)
      };
    }

    // CHEAP
    if (msg.includes("cheap") || msg.includes("affordable")) {
      const sorted = [...products].sort((a, b) => a.product_cost - b.product_cost);

      return {
        sender: "bot",
        type: "products",
        content: sorted.slice(0, 3)
      };
    }

    // EXPENSIVE
    if (msg.includes("expensive") || msg.includes("premium")) {
      const sorted = [...products].sort((a, b) => b.product_cost - a.product_cost);

      return {
        sender: "bot",
        type: "products",
        content: sorted.slice(0, 3)
      };
    }

    // SEARCH BY NAME
    const matches = products.filter(p =>
      p.product_name.toLowerCase().includes(msg)
    );

    if (matches.length > 0) {
      return {
        sender: "bot",
        type: "products",
        content: matches.slice(0, 3)
      };
    }

    // FALLBACK
    return {
      sender: "bot",
      type: "text",
      content: "Try asking: cheap shoes, Nike shoes, or what do you have"
    };
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#0d6efd",
          color: "white",
          fontSize: "22px",
          border: "none",
          zIndex: 9999
        }}
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "#0d6efd",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          >
            Cova Bot 🤖
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>

                {/* USER */}
                {msg.sender === "user" && (
                  <div style={{ textAlign: "right" }}>
                    <span className="badge bg-primary">
                      {msg.content}
                    </span>
                  </div>
                )}

                {/* BOT TEXT */}
                {msg.sender === "bot" && msg.type === "text" && (
                  <span className="badge bg-light text-dark">
                    {msg.content}
                  </span>
                )}

                {/* BOT PRODUCTS */}
                {msg.sender === "bot" && msg.type === "products" &&
                  msg.content.map((p, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        window.location.href = `/#product-${p.product_id}`;
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px",
                        margin: "6px 0",
                        background: "#f1f1f1",
                        borderRadius: "8px"
                      }}
                    >
                      {/* IMAGE */}
                      <img
                        src={`http://dumafidel.alwaysdata.net/static/images/${p.product_photo}`}
                        alt={p.product_name}
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />

                      {/* TEXT */}
                      <div style={{ fontSize: "13px" }}>
                        <div><b>{p.product_name}</b></div>

                        {/* ⭐ RATINGS (random fallback if no DB rating) */}
                        {renderStars(p.product_rating || Math.random() * 5)}

                        <div>Ksh {p.product_cost}</div>
                      </div>
                    </div>
                  ))
                }

              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type message..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;