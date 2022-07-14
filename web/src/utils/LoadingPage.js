import React from "react";
import "./loading.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div className="loadingContainer">
      <CircularProgress style={{ height: "200px", width: "200px" }} />
    </div>
  );
};

export default LoadingPage;
