import React from "react";
import { useNavigate } from "react-router-dom";
function Protected() {
  let userdata;
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("jwtoken");
    window.alert("Logged Out");
    navigate("/");
  };

  const getProtectedPage = async () => {
    try {
      const resp = await fetch("/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtoken"),
        },
      });

      const data = await resp.json();
      userdata = data;
    } catch (err) {
      console.log(err);
    }
  };

  getProtectedPage();
  console.log(userdata);
  return (
    <>
      <h2>Protected Page</h2>
      <div>Welcome </div>
      <button onClick={Logout}>Log Out</button>
    </>
  );
}

export default Protected;
