import React, { useState, useEffect } from 'react';

const UserLocation = ({onPositionChange}) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        onPositionChange({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        
      });
    } else {
      console.log("La geolocalització no esta havilitada pel teu navegador.");
    }
  }, []);

  return (
    <div>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>

      ) : (
        <p>Loading...</p>
      )}
      <div className='flex items-center justify-center'>
        <iframe
          width="1000"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.longitude}%2C${position.latitude}%2C${position.longitude}%2C${position.latitude}&layer=mapnik&marker=${position.latitude}%2C${position.longitude}`}
        ></iframe>
      </div>


    </div>
  );
}

export default UserLocation;