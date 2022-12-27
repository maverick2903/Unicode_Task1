import React from "react";
function Profile() {
  let data;
  const getProfilePage = async (req, resp) => {
    try {
      resp = await fetch("/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtoken"),
        },
      });
      data = await resp.json();

      console.log(data);
    } catch (err) {
      console.log(err);
      console.log(localStorage.getItem("jwtoken"));
    }
  };

  return (
    <>
      <h2>Profile Page</h2>
      <div>Welcome </div>
      <button onClick={getProfilePage}>Click me</button>
    </>
  );
}

export default Profile;
