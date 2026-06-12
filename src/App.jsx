import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'

import PlacesList from "./components/PlacesList";

function App() {
  const [places, setPlaces] = useState([]);

  const locations = [
  { name: "Athirappilly Waterfalls", lat: 10.2852, lng: 76.5698 },
  { name: "Vazhachal Waterfalls", lat: 10.3137, lng: 76.5777 },
  { name: "Peechi Dam", lat: 10.5270, lng: 76.3990 },
  { name: "Poomala Dam", lat: 10.6494, lng: 76.3086 },
  { name: "Vilangan Hills", lat: 10.5558, lng: 76.1800 },
  { name: "Guruvayur", lat: 10.5943, lng: 76.0411 },
  { name: "Chalakudy", lat: 10.3007, lng: 76.3376 },
  { name: "Kodungallur", lat: 10.2326, lng: 76.1951 },
  { name: "Irinjalakuda", lat: 10.3424, lng: 76.2112 },
  { name: "Kunnamkulam", lat: 10.6467, lng: 76.0710 },
];


  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const sortedPlaces = locations
          .map((place) => ({
            ...place,
            distance: calculateDistance(
              userLat,
              userLng,
              place.lat,
              place.lng
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPlaces(sortedPlaces);
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">
        Nearest Places
      </h1>

      <button
        onClick={getLocation}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-6"
      >
        Get My Location
      </button>

      <PlacesList places={places} />
    </div>
  );
}

export default App;