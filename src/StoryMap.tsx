import Mapbox, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { FC, PropsWithChildren, ReactNode, memo, useRef, useEffect, useState } from 'react';
import Map, { Layer, Source, MapRef } from 'react-map-gl';
import type { GeoJSON } from 'geojson';
import { Canvas, CanvasProps } from 'react-three-map';
import { Box, useGLTF } from '@react-three/drei';
import { ApartmentModel } from './ApartmentModel';
import BuildingModal from './modals/BuildingModal';
import Navigation from './Navigation';
import * as THREE from 'three';

export interface StoryMapProps extends PropsWithChildren {
  latitude: number;
  longitude: number;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  canvas?: Partial<CanvasProps>;
  mapChildren?: ReactNode;
}

/** `<Map>` styled for stories */
export const StoryMapbox: FC<StoryMapProps> = ({
  latitude,
  longitude,
  canvas,
  children,
  mapChildren,
  ...rest
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const mapStyle = 'mapbox://styles/mapbox/standard';
  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function onBuildingSelect(e: THREE.Intersection): void {
    openBuildingModal('buildingId');
  }

  function openBuildingModal(buildingId: string): void {
    setSelectedBuilding(buildingId);
    setIsModalOpen(true);
  }

  /* onMapLoad will run after the map is loaded, we load the layers after the map is loaded */
  const onMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Navigation />

      {!!mapboxToken && (
        <Map
          ref={mapRef}
          onLoad={onMapLoad}
          antialias
          initialViewState={{ latitude, longitude, ...rest }}
          maxPitch={rest.pitch ? Math.min(rest.pitch, 85) : undefined}
          mapStyle={mapStyle}
          mapboxAccessToken={mapboxToken}
        >
          {mapLoaded && (
            <>
              <MainLayer />
              <EarserLayer />
            </>
          )}

          <Canvas latitude={latitude} longitude={longitude}>
            {children}
            <Lights />
            <object3D scale={500}>
              <ApartmentModel onBuildingSelect={onBuildingSelect} />
            </object3D>
          </Canvas>
        </Map>
      )}

      <BuildingModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        buildingName={selectedBuilding}
      />
    </div>
  );
};

const Lights = () => {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#60666C']} position={[1, 4.5, 3]} />
      <ambientLight intensity={0.5} />
    </>
  );
};

const EarserLayer = memo(() => {
  const geoJsonFeature: GeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [77.62752579188799, 12.937222309616459],
              [77.6273474045247, 12.93747580751102],
              [77.6270929908249, 12.937261898159363],
              [77.62731621537597, 12.937003458075637],
              [77.6275472457628, 12.937196003090648],
              [77.62752579188799, 12.937222309616459],
            ],
          ],
          type: 'Polygon',
        },
      },
    ],
    bbox: [0, 0, 0, 0],
  };

  return (
    <Source id="eraser" type="geojson" data={geoJsonFeature}>
      <Layer
        id="eraser-layer"
        type="clip"
        source="eraser"
        layout={{
          'clip-layer-types': ['symbol', 'model'],
        }}
      />
    </Source>
  );
});

const MainLayer = memo(() => {
  const geoJsonFeature: GeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [77.62011962794503, 12.921143840828591],
              [77.63380534560025, 12.925202679365057],
              [77.63696720540491, 12.925209305792912],
              [77.63780826920907, 12.92744046088427],
              [77.63859516773209, 12.929970388513283],
              [77.63734282515729, 12.93290995411759],
              [77.63551943013303, 12.934919769835403],
              [77.63458347886917, 12.936052642736556],
              [77.63306630887939, 12.937833391158875],
              [77.63270123387122, 12.938525575130114],
              [77.63428709700247, 12.938694971077439],
              [77.63588691823037, 12.93932005673662],
              [77.64092766140544, 12.947510504325507],
              [77.63940807201999, 12.949772366389794],
              [77.63932895465513, 12.950552451425366],
              [77.64141114943209, 12.954374977072632],
              [77.64156963207722, 12.960614366438307],
              [77.63420467346435, 12.961782084845467],
              [77.632122787571, 12.961233849869501],
              [77.62652216028715, 12.96333783493634],
              [77.62572216921575, 12.965521794559123],
              [77.62172220942148, 12.967391259939575],
              [77.61940253981282, 12.965753317360026],
              [77.61772132487931, 12.96528839778638],
              [77.61108056779364, 12.96723767186998],
              [77.60884275204103, 12.966767251328534],
              [77.60668498187653, 12.9662195711511],
              [77.60507347471923, 12.95219031439467],
              [77.60771915697677, 12.942909963174998],
              [77.62011962794503, 12.921143840828591],
            ],
          ],
          type: 'Polygon',
        },
      },
    ],
  };

  return (
    <Source id="maine" type="geojson" data={geoJsonFeature}>
      <Layer
        id="maine"
        type="fill"
        source="maine"
        paint={{
          'fill-color': '#FFFF00',
          'fill-opacity': 0.5,
        }}
        maxzoom={15}
      />

      <Layer
        id="outline"
        type="line"
        source="maine"
        paint={{
          'line-color': '#E49B0F',
          'line-width': 3,
        }}
      />
    </Source>
  );
});
