const axios = require('axios');
const config = require('../utils/config')

const findDistance = async (start, end) => {
    try {
      console.log("start:", start, typeof start)
      console.log("end:", end, typeof end)
      const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
          api_key: config.ORS_API_KEY,
            start: start,
            end: end,
        }})
      return response.data.features[0].properties.summary.distance;
    } catch (error) {
      console.error("Error calculating distance:", error.message);
      throw new Error("Failed to calculate distance");
    }
  };

  module.exports = findDistance