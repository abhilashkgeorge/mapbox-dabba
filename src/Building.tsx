import React from 'react';
import { useParams } from 'react-router-dom';

const Building = () => {
  const { buildingId } = useParams();
  return <div className="bg-transparent">Building {buildingId}</div>;
};

export default Building;
