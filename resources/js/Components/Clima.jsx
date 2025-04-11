import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Clima = ({ ubicacio }) => {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=5d5f1506e7234aa59f0214218240201&q=${ubicacio}&aqi=no`);
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };

        fetchWeather();
    }, [ubicacio]);

    if (!weatherData) return <div>Loading...</div>;

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Clima a {weatherData.location.name}</h2>

            <div className="flex items-center">
                <img className="mr-4 w-16 h-16" src={weatherData.current.condition.icon} alt="weather icon" />

                <div>
                    <span className="text-4xl font-bold">{weatherData.current.temp_c}°C</span>
                    <span className="text-3xl font-bold text-gray-600"><h3><b>{weatherData.current.condition.text}</b></h3></span>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Vent</span>
                            <span>{weatherData.current.wind_kph} kph</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Pressió</span>
                            <span>{weatherData.current.pressure_mb} mb</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Humitat</span>
                            <span>{weatherData.current.humidity}%</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Núvol</span>
                            <span>{weatherData.current.cloud}%</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Temperatura presidida</span>
                            <span>{weatherData.current.feelslike_c}°C</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">UV</span>
                            <span>{weatherData.current.uv}</span>
                        </div>

                        <div className="border p-2 rounded-md">
                            <span className="block text-xl font-bold">Visibilitat</span>
                            <span>{weatherData.current.vis_km} km</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Clima;