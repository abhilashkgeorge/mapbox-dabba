import React from 'react';
import { Billboard, Cylinder, Text } from '@react-three/drei';

interface MarkerProps {
  position: [number, number, number];
  text: string;
}

export default function Marker({ position, text }: MarkerProps) {
  return (
    <group position={position}>
      <hemisphereLight args={['#ffffff', '#60666C']} position={[1, 4.5, 3]} intensity={Math.PI} />
      <Cylinder args={[0.5, 0.1, 2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="yellow" />
      </Cylinder>
      <Billboard position={[0, 2.5, 0]}>
        <Text 
          fontSize={1} 
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Billboard>
    </group>
  );
}