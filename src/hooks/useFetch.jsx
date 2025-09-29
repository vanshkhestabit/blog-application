import React, { useState } from "react";

const useFetch = (func) => {
  const [loading, setLoading] = useState(false);

  const fun = async (...args) => {
    try {
      setLoading(true);
      await func(...args);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fun };
};

export default useFetch;
