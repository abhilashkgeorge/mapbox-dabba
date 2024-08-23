import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
function App() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(77.62684);
    const [lat, setLat] = useState(12.937156);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/abhiknox/cm00qjkl1007n01qo1tv5fep9",
            zoom: zoom,
            pitch: 60,
            bearing: -150,
            center: [lng, lat],
        });

        mapRef.current.on("style.load", () => {
            mapRef.current.addSource("eraser", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                coordinates: [
                                    [
                                        [77.62745838260054, 12.93715932226209],
                                        [77.6273241385162, 12.937332519826285],
                                        [77.62720353529443, 12.937240953321094],
                                        [77.62733405149396, 12.937063337442765],
                                        [77.62745838260054, 12.93715932226209],
                                    ],
                                ],
                                type: "Polygon",
                            },
                        },
                    ],
                },
            });

            mapRef.current.addSource("model", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {
                        "model-uri":
                            "https://docs.mapbox.com/mapbox-gl-js/assets/tower.glb",
                    },
                    geometry: {
                        coordinates: [77.62745838260054, 12.93715932226209],
                        type: "Point",
                    },
                },
            });
            mapRef.current.addLayer({
                id: "layer",
                type: "symbol",
                source: "model",
            });

            mapRef.current.addLayer({
                id: "tower",
                type: "model",
                source: "model",
                // minzoom: 15,
                layout: {
                    "model-id": ["get", "model-uri"],
                },
                paint: {
                    "model-opacity": 1,
                    "model-rotation": [0.0, 0.0, 0.0],
                    "model-scale": [0.2, 0.2, 0.1],
                    "model-color-mix-intensity": 0,
                    "model-cast-shadows": true,
                    "model-emissive-strength": 0.6,
                },
            });
        });
    }, [lng, lat]);
    return (
        <div className="App">
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default App;