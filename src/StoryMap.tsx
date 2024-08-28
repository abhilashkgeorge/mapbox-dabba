import Mapbox, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { FC, PropsWithChildren, ReactNode, memo, useRef, useEffect, useState } from 'react';
import Map, { Layer, Source, MapRef } from 'react-map-gl';
import type { MapMouseEvent } from 'mapbox-gl';
import type { GeoJSON } from 'geojson';
import { Canvas, CanvasProps } from 'react-three-map';
import { Box, useGLTF } from '@react-three/drei';
import { ApartmentModel } from './ApartmentModel';
import BuildingModal from './modals/BuildingModal';
import Navigation from './Navigation';
import * as THREE from 'three';
import { koramangalaCoordinates } from './coordinates/areas/koramangala';
import mapBaseStyles from './mapBaseStyles';
import type { StyleSpecification } from 'mapbox-gl';
import bbox from '@turf/bbox';

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
  const mapRef = useRef<MapRef>(null);

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

  const handleClickOnMap = (e: MapMouseEvent) => {
    console.log(e.features);
    console.log(e.lngLat.toBounds());

    const feature = e.features?.[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  };

  const mapStyles: StyleSpecification = {
    ...mapBaseStyles,
    sources: {
      ...mapBaseStyles.sources,
      maine: {
        type: 'geojson',
        data: koramangalaCoordinates,
      },
      eraser: {
        type: 'geojson',
        data: {
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
        },
      },
    },
    layers: [
      ...mapBaseStyles.layers,
      {
        id: 'maine',
        type: 'fill',
        source: 'maine',
        paint: {
          'fill-color': '#FFFF00',
          'fill-opacity': 0.5,
        },
        maxzoom: 15,
      },
      {
        id: 'outline',
        type: 'line',
        source: 'maine',
        paint: {
          'line-color': '#E49B0F',
          'line-width': 3,
        },
      },
      {
        id: 'eraser-layer',
        type: 'clip',
        source: 'eraser',
        layout: {
          'clip-layer-types': ['symbol', 'model'],
        },
      },
    ],
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Navigation />

      {!!mapboxToken && (
        <Map
          ref={mapRef}
          antialias
          initialViewState={{ latitude, longitude, ...rest }}
          maxPitch={rest.pitch ? Math.min(rest.pitch, 85) : undefined}
          mapStyle={mapStyles}
          mapboxAccessToken={mapboxToken}
          interactiveLayerIds={['1', '2', 'maine', 'mapbox']}
          interactive={true}
          onClick={handleClickOnMap}
        >
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
