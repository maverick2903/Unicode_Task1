const Listing = require("../Models/Listing");
const nodeGeocoder = require("node-geocoder");
const options = {
  provider: "openstreetmap",
};

const geocoder = nodeGeocoder(options);

const addListing = async (req, resp) => {
  const locationList = await geocoder.geocode(req.body.location);
  const location = {
    type: "Point",
    coordinates: [locationList[0].longitude, locationList[0].latitude],
  };
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  console.log(startDate);
  const date = [startDate, endDate];

  const list = new Listing({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    location,
    photos: req.body.photos,
    rules: req.body.rules,
    date,
  });
  list.save();
  return resp.status(200).send(req.body);
};

module.exports = { addListing };
