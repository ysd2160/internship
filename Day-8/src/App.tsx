import React, { useState } from "react";

const App = () => {
  // ⿡ Like Button
  const [liked, setLiked] = useState(false);

  // ⿢ Mark as Done / Completed / Purchased / Read
  const [isDone, setIsDone] = useState(false);

  // ⿣ Expand / Collapse Details
  const [showDetails, setShowDetails] = useState(false);

  // ⿤ Increment / Decrement Quantity
  const [quantity, setQuantity] = useState(1);

  // ⿥ Theme Toggle (Light / Dark)
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "#222" : "#f5f5f5",
        color: darkTheme ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🧩 Interactive Features Demo</h1>

      {/* ⿡ Like Button */}
      <div style={boxStyle}>
        <h3>❤ Like Button</h3>
        <button onClick={() => setLiked(!liked)}>
          {liked ? "💖 Liked" : "🤍 Like"}
        </button>
      </div>

      {/* ⿢ Mark as Done / Completed */}
      <div style={boxStyle}>
        <h3>✅ Mark as Done</h3>
        <p>Status: {isDone ? "Completed ✅" : "Not Done ❌"}</p>
        <button onClick={() => setIsDone(!isDone)}>
          {isDone ? "Mark as Not Done" : "Mark as Done"}
        </button>
      </div>

      {/* ⿣ Expand / Collapse Details */}
      <div style={boxStyle}>
        <h3>📄 Expand / Collapse Details</h3>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        {showDetails && (
          <p>
            Here are some details... 🌟 This is where extra content or
            information can be shown!
          </p>
        )}
      </div>

      {/* ⿤ Increment / Decrement Quantity */}
      <div style={boxStyle}>
        <h3>🛒 Quantity Selector</h3>
        <div>
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            ➖
          </button>
          <span style={{ margin: "0 15px", fontSize: "18px" }}>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>➕</button>
        </div>
      </div>

      {/* ⿥ Theme Toggle */}
      <div style={boxStyle}>
        <h3>🌗 Theme Toggle</h3>
        <button onClick={() => setDarkTheme(!darkTheme)}>
          Switch to {darkTheme ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

// 🔲 Simple Box Styling
const boxStyle = {
  border: "1px solid gray",
  padding: "15px",
  margin: "15px 0",
  borderRadius: "8px",
};

export default App;