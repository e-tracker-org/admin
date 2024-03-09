import React from "react";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              animation: "spin 1s linear infinite",
              borderRadius: "50%",
              height: "16px",
              width: "16px",
              borderTop: "4px solid #00f",
              borderBottom: "4px solid #00f",
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Loader;
