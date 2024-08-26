import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Threebox } from "threebox-plugin";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
function App() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [lng, setLng] = useState(77.62684);
    const [lat, setLat] = useState(12.937156);
    const [zoom, setZoom] = useState(19);

    useEffect(() => {
        function rotateCamera(timestamp) {
            mapRef.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
            requestAnimationFrame(rotateCamera);
        }

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            zoom: zoom,
            pitch: 60,
            bearing: -150,
            center: [lng, lat],
        });

        console.log(mapRef.current);

        mapRef.current.on("style.load", () => {
            // mapRef.current.setConfigProperty("basemap", "darkPreset", "dawn");
        });

        mapRef.current.on("style.load", () => {
            mapRef.current.on("load", () => {

                // rotateCamera(0);
                mapRef.current.addSource("maine", {
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
                                            [
                                                77.62011962794503,
                                                12.921143840828591,
                                            ],
                                            [
                                                77.63380534560025,
                                                12.925202679365057,
                                            ],
                                            [
                                                77.63696720540491,
                                                12.925209305792912,
                                            ],
                                            [
                                                77.63780826920907,
                                                12.92744046088427,
                                            ],
                                            [
                                                77.63859516773209,
                                                12.929970388513283,
                                            ],
                                            [
                                                77.63734282515729,
                                                12.93290995411759,
                                            ],
                                            [
                                                77.63551943013303,
                                                12.934919769835403,
                                            ],
                                            [
                                                77.63458347886917,
                                                12.936052642736556,
                                            ],
                                            [
                                                77.63306630887939,
                                                12.937833391158875,
                                            ],
                                            [
                                                77.63270123387122,
                                                12.938525575130114,
                                            ],
                                            [
                                                77.63428709700247,
                                                12.938694971077439,
                                            ],
                                            [
                                                77.63588691823037,
                                                12.93932005673662,
                                            ],
                                            [
                                                77.64092766140544,
                                                12.947510504325507,
                                            ],
                                            [
                                                77.63940807201999,
                                                12.949772366389794,
                                            ],
                                            [
                                                77.63932895465513,
                                                12.950552451425366,
                                            ],
                                            [
                                                77.64141114943209,
                                                12.954374977072632,
                                            ],
                                            [
                                                77.64156963207722,
                                                12.960614366438307,
                                            ],
                                            [
                                                77.63420467346435,
                                                12.961782084845467,
                                            ],
                                            [
                                                77.632122787571,
                                                12.961233849869501,
                                            ],
                                            [
                                                77.62652216028715,
                                                12.96333783493634,
                                            ],
                                            [
                                                77.62572216921575,
                                                12.965521794559123,
                                            ],
                                            [
                                                77.62172220942148,
                                                12.967391259939575,
                                            ],
                                            [
                                                77.61940253981282,
                                                12.965753317360026,
                                            ],
                                            [
                                                77.61772132487931,
                                                12.96528839778638,
                                            ],
                                            [
                                                77.61108056779364,
                                                12.96723767186998,
                                            ],
                                            [
                                                77.60884275204103,
                                                12.966767251328534,
                                            ],
                                            [
                                                77.60668498187653,
                                                12.9662195711511,
                                            ],
                                            [
                                                77.60507347471923,
                                                12.95219031439467,
                                            ],
                                            [
                                                77.60771915697677,
                                                12.942909963174998,
                                            ],
                                            [
                                                77.62011962794503,
                                                12.921143840828591,
                                            ],
                                        ],
                                    ],
                                    type: "Polygon",
                                },
                            },
                        ],
                    },
                });

                mapRef.current.addLayer({
                    id: "maine",
                    type: "fill",
                    source: "maine",
                    layout: {},
                    paint: {
                        "fill-color": "#FFFF00",
                        "fill-opacity": 0.5,
                    },
                    // minzoom: zoom-1,
                    maxzoom: zoom - 1,
                });

                mapRef.current.addLayer({
                    id: "outline",
                    type: "line",
                    source: "maine",
                    layout: {},
                    paint: {
                        "line-color": "#E49B0F",
                        "line-width": 3,
                    },
                });

                mapRef.current.addLayer({
                    id: "rmz-gateway",
                    type: "custom",
                    renderingMode: "3d",
                    onAdd: function (map, gl) {
                        window.tb = new Threebox(
                            mapRef.current,
                            mapRef.current.getCanvas().getContext("webgl"),
                            { defaultLights: true },
                        );
                        const options = {
                            obj: "src/assets/building__interior_effect.glb",
                            type: "glb",
                            scale: { x: 0.8, y: 1, z: 0.6 },
                            units: "meters",
                            rotation: { x: 90, y: -90, z: 0 },
                        };

                        window.tb.loadObj(options, (model) => {
                          model.setCoords([77.62732365299053, 12.937333647640244]);
                          model.setRotation({ x: 0, y: 0, z: -135 });
                          window.tb.add(model);
                        });
                    },
                    render: function (gl, matrix) {
                        window.tb.update();
                    },
                    queryRenderedFeatures: function(geometry) {
                      return window.tb.queryRenderedFeatures(geometry);
                    }
                });

            });

            // mapRef.current.addLayer({
            //     id: "custom-threebox-model",
            //     type: "custom",
            //     renderingMode: "3d",
            //     onAdd: function () {
            //         window.tb = new Threebox(
            //             mapRef.current,
            //             mapRef.current.getCanvas().getContext("webgl"),
            //             { defaultLights: true },
            //         );
            //         const scale = 3.2;
            //         const options = {
            //             obj: "src/assets/LorientTrees.glb",
            //             type: "glb",
            //             scale: { x: scale, y: scale, z: 2.7 },
            //             units: "meters",
            //             rotation: { x: 90, y: -90, z: 0 },
            //         };

            //         window.tb.loadObj(options, (model) => {
            //             model.setCoords([
            //                 77.60978239671488, 12.955358783463154,
            //             ]);
            //             model.setRotation({ x: 0, y: 0, z: 241 });
            //             window.tb.add(model);
            //         });
            //     },

            //     render: function () {
            //         window.tb.update();
            //     },
            // });
        });

        return () => mapRef.current.remove();
    }, [lng, lat]);

    return (
        <div className="App">
            <div ref={mapContainer} className="map-container" style={{ pointerEvents: 'auto' }} />
        </div>
    );
}

export default App;
