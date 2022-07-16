import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";

const ProtectRoute = () => {
  const accessToken = useGetLocalStore("token");

  if (jwtDecode(accessToken) < Date.now() / 1000) {
    navigate("/login");
  } else {
    try {

        const usre = await axios.get('/')

    } catch (err) {
      toast.error("Login failed");
    }
  }

  return <></>;
};

export default ProtectRoute;
