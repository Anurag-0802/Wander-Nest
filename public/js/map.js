const map = new maplibregl.Map({
  container: "map", // container id
  style: `https://api.maptiler.com/maps/streets/style.json?key=${window.mapApi}`,
  center: [77.209, 28.6139], // default starting position [lng, lat]
  zoom: 6, // starting zoom
  maplibreLogo: true,
});

// Function to perform geocoding using MapTiler API
async function geocodeLocation(location) {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://api.maptiler.com/geocoding/${encodedLocation}.json?key=${window.mapApi}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Geocoding API request failed");
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].geometry.coordinates;
      return { lng, lat };
    } else {
      throw new Error("No results found for location");
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}

// Use the global listing location variable to update the map
(async () => {
  if (window.LISTING_LOCATION) {
    const coords = await geocodeLocation(window.LISTING_LOCATION);
    if (coords) {
      map.setCenter([coords.lng, coords.lat]);
      map.setZoom(12);
      const marker = new maplibregl.Marker()
        .setLngLat([coords.lng, coords.lat])
        .addTo(map);
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<h4>${window.LISTING_LOCATION}</h4><p>Exact Location provided after booking</p>`
      );
      marker.setPopup(popup);
    } else {
      console.warn("Could not geocode the location, using default center.");
    }
  }
})();
