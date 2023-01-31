import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
function Home() {
  const [listing, getListing] = useState([]);

  useEffect(() => {
    display();
  });

  const display = async (e) => {
    e.preventDefault();
    const resp = await fetch("/listing/view", { method: "GET" });
    const data = await resp.json();
    getListing(data);
    console.log(data);
  };

  return (
    <div>
      <div style={{ margin: 20 }}></div>
      <Button
        style={{ paddingLeft: 80, paddingRight: 80, marginBottom: 20 }}
        variant="contained"
        onClick={display}
        endIcon={<ReviewsIcon />}
      >
        View Listing
      </Button>
      <div>
        {listing.map((item) => (
          <div key={item.id} style={{ width: "20%", display: "inline-block" }}>
            <div style={{ backgroundColor: "lightgray", padding: "10px" }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
