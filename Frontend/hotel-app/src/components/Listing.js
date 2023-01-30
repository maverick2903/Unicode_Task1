import React, { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const rules = [
  "No Pets",
  "No Smoking",
  "Only Vegetarian",
  "No Alcohol",
  "No Visitors",
  "Curfew",
];

function Listing() {
  //getting username from jwt token
  const jwt = localStorage.getItem("jwtoken");
  const jwtParts = jwt.split(".");
  const payload = jwtParts[1];
  const decodedPayload = window.atob(payload, "base64");
  const payloadObject = JSON.parse(decodedPayload);
  const username = payloadObject.username;
  console.log(username);
  const [title, setTitle] = useState(""); //Storing title of the place

  const [description, setDescription] = useState(""); //Storing description

  const [photos, setPhotos] = useState([]); //Storing file location

  const [location, setLocation] = useState(""); //Storing location

  const [ruleList, setRuleList] = useState([]); //Storing rule choices

  const handleChange = (event) => {
    //Change in rule
    const {
      target: { value },
    } = event;
    setRuleList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [date, setDate] = useState([
    //Storing dates available
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleInput = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    /*     for (let i = 0; i < photos.length; i++) {
      formData.append("photos[]", photos[i]);
    } */
    Array.from(photos).forEach((photo) => {
      formData.append("photos", photo);
    });
    formData.append("username", username);
    formData.append("startDate", date[0].startDate);
    formData.append("endDate", date[0].endDate);
    formData.append("location", location);
    formData.append("rules", ruleList);
    console.log(formData.photos);
    const resp = await fetch("/listing/add", {
      method: "POST",
      /*       headers: { "Content-Type": "multipart/form-data" }, */
      body: formData,
    });

    const data = await resp.json();
    console.log(data);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: 1,
          /* backgroundColor: "gray", */
          margin: 10,
        }}
      >
        <Grid align="center" sx={{ padding: 3, fontSize: 30 }}>
          New Listing
        </Grid>
        <Grid sx={{ padding: 0 }}>
          <form method="POST" encType="multipart/form-data">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
              }}
            >
              <TextField
                id="filled-basic"
                label="Title"
                name="title"
                variant="outlined"
                margin="normal"
                placeholder="Name of the Hotel/House"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth
              />
              <div style={{ margin: 10 }}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="medium" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Enter location of the place"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <TextField
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Describe the Hotel/House"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  fullWidth
                />
              </div>
              <div style={{ margin: 10 }}>
                <Button variant="contained" component="label">
                  Upload photos here
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={(e) => {
                      setPhotos(e.target.files);
                    }}
                  />
                </Button>
              </div>
              <div style={{ margin: 10 }}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Rules
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    fullWidth
                    value={ruleList}
                    onChange={handleChange}
                    input={<OutlinedInput label="Rules" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {rules.map((rule) => (
                      <MenuItem key={rule} value={rule}>
                        <Checkbox checked={ruleList.indexOf(rule) > -1} />
                        <ListItemText primary={rule} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ margin: 10 }}>
                <Paper elevation={10}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                </Paper>
              </div>
              <div style={{ margin: 10 }}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleInput}
                  fullWidth
                >
                  Submit Listing
                </Button>
              </div>
            </Box>
          </form>
        </Grid>
      </Box>
    </>
  );
}

export default Listing;
