function PlacesList({ places }) {
  return (
    <ul className="space-y-3">
      {places.map((place, index) => (
        <li
          key={index}
          className="bg-gray-100 p-3 rounded-lg shadow"
        >
          {index + 1}. {place.name} -{" "}
          {place.distance.toFixed(2)} km
        </li>
      ))}
    </ul>
  );
}

export default PlacesList;