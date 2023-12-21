import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Your state initialization here if needed
      latitude: null,
      longitude: null,
      error: null,
    };

    this.postData();
  }

  postData = async () => {
    try {
      // Get the user's current location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setState({ latitude, longitude });

            // Make a POST request to your backend with the obtained location
            this.sendLocationToServer(latitude, longitude);
          },
          (error) => {
            console.error(`Error getting location: ${error.message}`);
            this.setState({ error: error.message });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        this.setState({
          error: "Geolocation is not supported by this browser",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  sendLocationToServer = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        "https://accident-backend.onrender.com/data/open-link",
        { latitude, longitude }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const { latitude, longitude, error } = this.state;

    return (
      <div className="App">
        {/* Display the obtained location or error message */}
        {latitude && longitude && (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        )}
        {error && <p>Error: {error}</p>}
        {/* Your component's UI here */}
      </div>
    );
  }
}

export default App;
