import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Apartment_1_Walls_0: THREE.Mesh;
    Apartment_1_Building_Frame_0: THREE.Mesh;
    Apartment_1_Glass_Frame_0: THREE.Mesh;
    Apartment_1_Glass_0: THREE.Mesh;
    Apartment_1_Balcony_Metal_0: THREE.Mesh;
    Apartment_1_Door_0: THREE.Mesh;
    Apartment_1_Curtain_0: THREE.Mesh;
    Apartment_1_Roof_tile_0: THREE.Mesh;
    Apartment_1_Roof_Side_0: THREE.Mesh;
  };
  materials: {
    Building_Frame: THREE.MeshStandardMaterial;
    Walls: THREE.MeshStandardMaterial;
    Glass_Frame: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
    Balcony_Metal: THREE.MeshStandardMaterial;
    Door: THREE.MeshStandardMaterial;
    Curtain: THREE.MeshStandardMaterial;
    Roof_Side: THREE.MeshStandardMaterial;
    Roof_tile: THREE.MeshStandardMaterial;
  };
};

export const ApartmentModel = ({ onBuildingSelect, props }: any) => {
  const { nodes, materials } = useGLTF('./src/assets/apartment.gltf') as GLTFResult;

  const handleOnClick = () => {
    console.log('clicked');
  };

  return (
    <group {...props} dispose={null} onClick={onBuildingSelect}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1} position={[1.5, 0, 2]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Walls_0.geometry}
            material={materials.Walls}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Building_Frame_0.geometry}
            material={materials.Building_Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Glass_Frame_0.geometry}
            material={materials.Glass_Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Glass_0.geometry}
            material={materials.Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Balcony_Metal_0.geometry}
            material={materials.Balcony_Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Door_0.geometry}
            material={materials.Door}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Curtain_0.geometry}
            material={materials.Curtain}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Roof_Side_0.geometry}
            material={materials.Roof_Side}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apartment_1_Roof_tile_0.geometry}
            material={materials.Roof_tile}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/apartment.gltf');

export default ApartmentModel;
