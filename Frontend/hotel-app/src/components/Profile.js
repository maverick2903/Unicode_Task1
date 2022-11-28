import React from "react";
function Profile() {
  let userdata;

  const getProfilePage = async () => {
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

  getProfilePage();
  console.log(userdata);
  return (
    <>
      <h2>Profile Page</h2>
      <div>Welcome </div>
    </>
  );
}

export default Profile;
