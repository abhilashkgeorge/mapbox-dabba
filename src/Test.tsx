import React from 'react';
import { Billboard, Cylinder, Text } from '@react-three/drei';
import { StoryMapbox } from './StoryMap';

const Test = () => {
  return (
    <StoryMapbox latitude={12.937333647640244} longitude={77.62732365299053} zoom={18} pitch={60}>
      <Cylinder args={[1, 1, 40]} position={[0, 20, 0]}>
        <meshPhongMaterial color="yellow" />
      </Cylinder>
      <Billboard position={[0, 50, 0]}>
        <Text fontSize={17} color="#2592a8">
          Hi!
        </Text>
      </Billboard>
    </StoryMapbox>
  );
};

export default Test;
