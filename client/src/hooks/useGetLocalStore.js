import React from "react";

const useGetLocalStore = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export default useGetLocalStore;
