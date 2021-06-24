import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import Home from "./Home";

const PrivateScreen = (history) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        await axios.get("/api/private", config);
      } catch (error) {
        localStorage.removeItem("authToken");
        window.location.replace("/login");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <Home />
    </div>
  );
};

export default PrivateScreen;
