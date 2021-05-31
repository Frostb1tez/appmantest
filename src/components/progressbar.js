import React from "react";

const ProgressBar = ({ percent }) => {
  const containerStyles = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "0 10px",
  };

  const fillerStyles = {
    height: "100%",
    width: `${percent}%`,
    backgroundColor: "#F3701A",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
